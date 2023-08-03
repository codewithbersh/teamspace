from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import TeamSpace, Member
from .serializers import TeamSpaceSerializer, MemberSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied


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


class MemberViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]
