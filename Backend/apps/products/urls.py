from rest_framework.routers import DefaultRouter
from .views import ProductCategoryViewSet, ProductViewSet, ProductImageViewSet

app_name = "products"

router = DefaultRouter()
router.register('products', ProductViewSet, 'products')
router.register('categories', ProductCategoryViewSet, 'categories')
router.register('productImage', ProductImageViewSet, 'productImage')

urlpatterns = router.urls