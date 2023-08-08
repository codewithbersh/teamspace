from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    TeamSpaceViewSet,
    MemberViewSet,
    TicketViewSet,
    CommentViewSet,
    GetTeamSpaceMembersViewSet,
    GetTicketInformationViewSet,
    TeamSpaceHistoryViewSet,
    MemberHistoryViewSet,
    TicketHistoryViewSet,
    CommentDetailViewSet,
    CommentHistoryViewSet,
    GetTicketCommentsViewSet,
    GetTicketHistoryViewSet,
)

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="user")
router.register(r"teamspace", TeamSpaceViewSet, basename="teamspace")
router.register(r"members", MemberViewSet, basename="member")
router.register(r"tickets", TicketViewSet, basename="ticket")
router.register(r"comments", CommentViewSet, basename="comment")
router.register(r"comment-detail", CommentDetailViewSet, basename="comments")
router.register(
    r"ticket-information", GetTicketInformationViewSet, basename="ticket-information"
)
router.register(
    r"teamspace/(?P<team_space_id>[0-9a-f-]+)/members",
    GetTeamSpaceMembersViewSet,
    basename="teamspace_members",
)

router.register(
    r"tickets/(?P<ticket_id>[0-9a-f-]+)/comments",
    GetTicketCommentsViewSet,
    basename="ticket-comments",
)
router.register(
    r"tickets/(?P<ticket_id>[0-9a-f-]+)/history",
    GetTicketHistoryViewSet,
    basename="ticket-history",
)


# history
router.register(
    r"teamspace-history", TeamSpaceHistoryViewSet, basename="teamspace-history"
)
router.register(r"member-history", MemberHistoryViewSet, basename="member-history")
router.register(r"ticket-history", TicketHistoryViewSet, basename="ticket-history")
router.register(r"comment-history", CommentHistoryViewSet, basename="comment-history")

urlpatterns = router.urls
