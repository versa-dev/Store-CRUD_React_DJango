from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.SignupView.as_view()),
    path('users/', views.AccountListView.as_view()),
    path('users/<int:pk>/', views.AccountDetailView.as_view())
]
