from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    TeamSpaceViewSet,
    MemberViewSet,
    TicketViewSet,
    GetTeamSpaceMembersViewSet,
    GetTicketInformationViewSet,
    TeamSpaceHistoryViewSet,
    MemberHistoryViewSet,
    TicketHistoryViewSet,
)

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="user")
router.register(r"teamspace", TeamSpaceViewSet, basename="teamspace")
router.register(r"members", MemberViewSet, basename="member")
router.register(r"tickets", TicketViewSet, basename="ticket")
router.register(
    r"ticket-information", GetTicketInformationViewSet, basename="ticket-information"
)
router.register(
    r"teamspace/(?P<team_space_id>[0-9a-f-]+)/members",
    GetTeamSpaceMembersViewSet,
    basename="teamspace_members",
)

# history
router.register(
    r"teamspace-history", TeamSpaceHistoryViewSet, basename="teamspace-history"
)
router.register(r"member-history", MemberHistoryViewSet, basename="member-history")
router.register(r"ticket-history", TicketHistoryViewSet, basename="ticket-history")

urlpatterns = router.urls
