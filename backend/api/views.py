from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import TeamSpace, Member, Ticket, Comment, Assignee
from .serializers import (
    UserSerializer,
    TeamSpaceSerializer,
    MemberSerializer,
    TicketSerializer,
    CommentSerializer,
    AssigneeSerializer,
)
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamSpaceViewSet(viewsets.ModelViewSet):
    queryset = TeamSpace.objects.all()
    serializer_class = TeamSpaceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_team_spaces = Member.objects.filter(
            user=self.request.user, is_verified=True
        ).values_list("team_space", flat=True)
        return TeamSpace.objects.filter(id__in=user_team_spaces)

    def create(self, request):
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


class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        code = request.data.get("code")

        try:
            team_space = TeamSpace.objects.get(code=code)
        except TeamSpace.DoesNotExist:
            return Response(
                {"detail": "Invalid team_space code."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Member.objects.filter(team_space=team_space, user=request.user).exists():
            return Response(
                {"detail": "Your request has already been submitted."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        member = Member.objects.create(
            team_space=team_space,
            user=request.user,
            role="NA",
            is_verified=False,
        )

        serializer = self.get_serializer(member)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_object(self):
        team_space_id = self.request.query_params.get("team_space_id")
        user_id = self.request.query_params.get("user_id")

        if team_space_id and user_id:
            return get_object_or_404(
                Member, team_space__id=team_space_id, user__id=user_id
            )
        return super(MemberViewSet, self).get_object()

    def list(self, request, *args, **kwargs):
        team_space_id = request.query_params.get("team_space_id")
        user_id = request.query_params.get("user_id")

        if team_space_id and user_id:
            return self.retrieve(request, *args, **kwargs)

        return super(MemberViewSet, self).list(request, *args, **kwargs)

    def get_queryset(self):
        team_space_id = self.request.query_params.get("team_space_id")
        if team_space_id is not None:
            team_space = TeamSpace.objects.get(id=team_space_id)
            members = team_space.members.all()
            return members
        return Member.objects.all()


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = Ticket.objects.all()
        team_space_id = self.request.query_params.get("team_space_id")
        if team_space_id is not None:
            queryset = queryset.filter(team_space__id=team_space_id)
        return queryset


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class AssigneeViewSet(viewsets.ModelViewSet):
    queryset = Assignee.objects.all()
    serializer_class = AssigneeSerializer

    @action(detail=False, methods=["post"], url_path="ticket/(?P<ticket_id>[^/.]+)")
    def manage_assignees_for_ticket(self, request, ticket_id=None, *args, **kwargs):
        data = request.data

        Assignee.objects.filter(ticket=ticket_id).delete()

        if not data:
            return Response(status=status.HTTP_204_NO_CONTENT)

        created_data = []
        for item in data:
            serializer = self.get_serializer(data=item)
            if serializer.is_valid(raise_exception=False):
                self.perform_create(serializer)
                created_data.append(serializer.data)

        return Response(created_data, status=status.HTTP_201_CREATED)
