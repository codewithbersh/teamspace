from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TeamSpaceViewSet, MemberViewSet

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="user")
router.register(r"teamspace", TeamSpaceViewSet, basename="teamspace")
router.register(r"members", MemberViewSet, basename="member")

urlpatterns = router.urls
