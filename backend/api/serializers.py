from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from accounts.models import User
from .models import TeamSpace, Member, Ticket


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


class TicketSerializer(ModelSerializer):
    assignee = PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )
    created_by = PrimaryKeyRelatedField(queryset=User.objects.all())
    team_space = PrimaryKeyRelatedField(queryset=TeamSpace.objects.all())

    class Meta:
        model = Ticket
        fields = "__all__"
        depth = 1


class GetMemberSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Member
        fields = "__all__"


class GetTicketInformationSerliazer(ModelSerializer):
    assignee = UserSerializer(many=True)
    created_by = UserSerializer()

    class Meta:
        model = Ticket
        fields = "__all__"
        depth = 1
