from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import TeamSpace, Member
from .serializers import TeamSpaceSerializer, MemberSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamSpaceViewSet(ModelViewSet):
    serializer_class = TeamSpaceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TeamSpace.objects.filter(
            members__user=self.request.user, members__is_verified=True
        )

    def get_object(self):
        team_space = get_object_or_404(
            TeamSpace,
            pk=self.kwargs.get("pk"),
            members__user=self.request.user,
            members__is_verified=True,
        )

        if not team_space.members.filter(
            user=self.request.user, is_verified=True
        ).exists():
            raise PermissionDenied("You are not a verified member of this team space.")

        return team_space

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        Member.objects.create(
            team_space=TeamSpace.objects.get(id=serializer.data["id"]),
            user=request.user,
            role="SU",
            is_verified=True,
        )

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class MemberViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            team_space = TeamSpace.objects.get(code=request.data["code"])
            user = User.objects.get(id=request.data["user"])

            new_member = Member.objects.create(team_space=team_space, user=user)

            serializer = self.get_serializer(new_member)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist:
            return Response(
                {"error": "The provided team space code does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except IntegrityError:
            return Response(
                {"error": "Your request has already been submitted"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
