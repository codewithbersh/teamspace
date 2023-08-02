from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import TeamSpace, Member
from .serializers import TeamSpaceSerializer, MemberSerializer, UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamSpaceViewSet(ModelViewSet):
    queryset = TeamSpace.objects.all()
    serializer_class = TeamSpaceSerializer
    permission_classes = [IsAuthenticated]


class MemberViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    # permission_classes = [IsAuthenticated]
