from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    TeamSpaceViewSet,
    MemberViewSet,
    TicketViewSet,
    CommentViewSet,
    AssigneeViewSet,
    InitializeBackendViewSet,
)

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="user")
router.register(r"teamspace", TeamSpaceViewSet, basename="teamspace")
router.register(r"members", MemberViewSet, basename="member")
router.register(r"tickets", TicketViewSet, basename="ticket")
router.register(r"comments", CommentViewSet, basename="comment")
router.register(r"assignees", AssigneeViewSet, basename="assignee")


urlpatterns = [
    path("", include(router.urls)),
    path("init/", InitializeBackendViewSet.as_view(), name="init-backend"),
]
