from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    TeamSpaceViewSet,
    MemberViewSet,
    TicketViewSet,
    GetTeamSpaceMembersViewSet,
    GetTicketInformationViewSet,
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

urlpatterns = router.urls
