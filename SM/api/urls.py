from django.urls import path
from .views import UserListCreateView, UserDetailView,LikeToggleView, CommentCreateView, Feedview,PostListCreateView,LogoutView, PersonalFeedView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name="logout"),

    path('users/', UserListCreateView.as_view(), name='user-list'),
    path('users/<uuid:id>/', UserDetailView.as_view(), name='user-detail'),

    path('posts/', PostListCreateView.as_view(), name='post-list'),
    path('posts/<int:post_id>/like/', LikeToggleView.as_view(), name='like-toggle'),
    path('comments/', CommentCreateView.as_view(), name='comment-create'),
    path('feed/', Feedview.as_view(), name='users-feed'),
    path('personalfeed/', PersonalFeedView.as_view(), name="personal-feed")

]
