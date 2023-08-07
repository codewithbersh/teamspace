from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import TeamSpace, Member, Ticket, Comment
from .serializers import (
    TeamSpaceSerializer,
    MemberSerializer,
    UserSerializer,
    TicketSerializer,
    CommentSerializer,
    GetMemberSerializer,
    GetTicketInformationSerliazer,
    TeamSpaceHistorySerializer,
    MemberHistorySerliazer,
    TicketHistorySerializer,
    CommentHistorySerializer,
)
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

    def destroy(self, request, *args, **kwargs):
        team_space = self.get_object()

        if team_space.created_by != request.user:
            raise PermissionDenied("You are not authorized to delete this team space.")

        return super().destroy(request, *args, **kwargs)


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


class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]


class GetTeamSpaceMembersViewSet(ReadOnlyModelViewSet):
    serializer_class = GetMemberSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        team_space_id = self.kwargs.get("team_space_id", None)

        if team_space_id is not None:
            team_space = TeamSpace.objects.get(pk=team_space_id)
            return team_space.members
        else:
            return Response(
                {"detail": "TeamSpace ID not provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class GetTicketInformationViewSet(ReadOnlyModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = GetTicketInformationSerliazer
    permission_classes = [IsAuthenticated]


class TeamSpaceHistoryViewSet(ReadOnlyModelViewSet):
    queryset = TeamSpace.history.all()
    serializer_class = TeamSpaceHistorySerializer


class MemberHistoryViewSet(ReadOnlyModelViewSet):
    queryset = Member.history.all()
    serializer_class = MemberHistorySerliazer


class TicketHistoryViewSet(ReadOnlyModelViewSet):
    queryset = Ticket.history.all()
    serializer_class = TicketHistorySerializer


class CommentHistoryViewSet(ReadOnlyModelViewSet):
    queryset = Comment.history.all()
    serializer_class = CommentHistorySerializer
