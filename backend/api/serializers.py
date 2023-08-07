from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    SerializerMethodField,
)
from accounts.models import User
from .models import TeamSpace, Member, Ticket


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "image_url"]


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


class TeamSpaceHistorySerializer(ModelSerializer):
    created_by = UserSerializer()
    history_user = UserSerializer()
    changed_fields = SerializerMethodField()

    class Meta:
        model = TeamSpace.history.model
        fields = "__all__"
        depth = 1

    def get_changed_fields(self, obj):
        if hasattr(obj, "prev_record") and obj.prev_record:
            return obj.diff_against(obj.prev_record).changed_fields
        return []


class MemberHistorySerliazer(ModelSerializer):
    changed_fields = SerializerMethodField()
    history_user = UserSerializer()
    user = UserSerializer()

    class Meta:
        model = Member.history.model
        fields = "__all__"
        depth = 1

    def get_changed_fields(self, obj):
        if hasattr(obj, "prev_record") and obj.prev_record:
            return obj.diff_against(obj.prev_record).changed_fields
        return []


class TicketHistorySerializer(ModelSerializer):
    created_by = UserSerializer()
    history_user = UserSerializer()
    changed_fields = SerializerMethodField()

    class Meta:
        model = Ticket.history.model
        fields = "__all__"
        depth = 1

    def get_changed_fields(self, obj):
        if hasattr(obj, "prev_record") and obj.prev_record:
            return obj.diff_against(obj.prev_record).changed_fields
        return []
