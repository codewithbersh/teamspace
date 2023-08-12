from rest_framework import serializers
from accounts.models import User
from .models import TeamSpace, Member, Ticket, Comment, Assignee


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "image_url"]


class MemberSerializer(serializers.ModelSerializer):
    user_detail = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = "__all__"

    def get_user_detail(self, obj):
        user_detail = obj.user
        return UserSerializer(user_detail).data


class TeamSpaceSerializer(serializers.ModelSerializer):
    created_by_detail = serializers.SerializerMethodField()
    assigned_members = serializers.SerializerMethodField()

    class Meta:
        model = TeamSpace
        fields = "__all__"

    def get_created_by_detail(self, obj):
        created_by = obj.created_by
        return UserSerializer(created_by).data

    def get_assigned_members(self, obj):
        members = obj.members.all()
        return MemberSerializer(members, many=True).data


class TicketSerializer(serializers.ModelSerializer):
    created_by_detail = serializers.SerializerMethodField()
    assigned_members = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = "__all__"

    def get_created_by_detail(self, obj):
        created_by = obj.created_by
        return MemberSerializer(created_by).data

    def get_assigned_members(self, obj):
        members = [assignee.member for assignee in obj.assignees.all()]
        return MemberSerializer(members, many=True).data

    def get_comments(self, obj):
        comments = obj.comments.all()
        return CommentSerializer(comments, many=True).data


class CommentSerializer(serializers.ModelSerializer):
    member_detail = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_member_detail(self, obj):
        member = obj.member
        return MemberSerializer(member).data


class AssigneeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignee
        fields = "__all__"
