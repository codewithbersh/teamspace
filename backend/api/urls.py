from rest_framework.routers import DefaultRouter
from .views import TeamSpaceViewSet

router = DefaultRouter()
router.register(r"teamspace", TeamSpaceViewSet, basename="teamspace")
urlpatterns = router.urls
