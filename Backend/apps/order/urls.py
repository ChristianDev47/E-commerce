from rest_framework.routers import DefaultRouter

from .views import OrderItemViewSet, OrderViewSet

app_name = "orders"

router = DefaultRouter()
router.register(r"^(?P<order_id>\d+)/order-items", OrderItemViewSet)
router.register("orders", OrderViewSet)


urlpatterns = router.urls
