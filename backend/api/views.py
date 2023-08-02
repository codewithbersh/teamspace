from rest_framework.viewsets import ModelViewSet
from accounts.models import User
from .models import TeamSpace, Member
from .serializers import TeamSpaceSerializer, MemberSerializer


class TeamSpaceViewSet(ModelViewSet):
    queryset = TeamSpace.objects.all()
    serializer_class = TeamSpaceSerializer
