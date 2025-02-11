"""URL configuration for the core app."""

from django.conf import settings
from django.urls import include, path, re_path

from rest_framework.routers import DefaultRouter

from core.api import viewsets
from core.authentication.urls import urlpatterns as oidc_urls

# - Main endpoints
router = DefaultRouter()
router.register("items", viewsets.ItemViewSet, basename="items")
router.register("users", viewsets.UserViewSet, basename="users")

# - Routes nested under a item
item_related_router = DefaultRouter()
item_related_router.register(
    "accesses",
    viewsets.ItemAccessViewSet,
    basename="item_accesses",
)
item_related_router.register(
    "invitations",
    viewsets.InvitationViewset,
    basename="invitations",
)


urlpatterns = [
    path(
        f"api/{settings.API_VERSION}/",
        include(
            [
                *router.urls,
                *oidc_urls,
                re_path(
                    r"^items/(?P<resource_id>[0-9a-z-]*)/",
                    include(item_related_router.urls),
                ),
            ]
        ),
    ),
    path(f"api/{settings.API_VERSION}/config/", viewsets.ConfigView.as_view()),
]
