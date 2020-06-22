from django.urls import include, path
from products import views

urlpatterns = [
    path('products/',views.ProductsList.as_view()),
    path('products/<int:pk>/',views.ProductDetail.as_view()),
    path('category/',views.CategoryList.as_view()),
    path('category/<int:pk>/',views.CategoryDetail.as_view()),
]