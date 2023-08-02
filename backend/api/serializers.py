from rest_framework.serializers import ModelSerializer
from accounts.models import User
from .models import TeamSpace, Member


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


class TeamSpaceSerializer(ModelSerializer):
    class Meta:
        model = TeamSpace
        fields = "__all__"


class MemberSerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"
