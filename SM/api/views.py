from .models import User,Post,Like,Comment
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer,PostSerializer,LikeSerializer,CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh')
        return response

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LikeToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        try:
            post = Post.objects.get(id=post_id)
            like = Like.objects.filter(user=user,post=post)

            if like.exists():
                like.delete()
                message = "Unliked"
            else:
                Like.objects.create(user=user,post=post)
                message = "Liked"

            post.likes_count = post.likes.count()
            post.save()

            return Response({"message": message, "likes_count": post.likes_count}, status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status.HTTP_404_NOT_FOUND)
        
class Feedview(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        page = int(request.query_params.get('page', 1))
        posts = Post.objects.all().order_by('-created_at')

        serializer = PostSerializer(posts, many=True)

        payload = {
            "posts": serializer.data,
            "pagination_data": {
                "current_page": page,
                "has_next": True
            }
        }
        return Response(payload)
    

class PersonalFeedView(APIView):
    permission_classes =[IsAuthenticated]

    def get(self, request):
        page = int(request.query_params.get('page', 1))

        posts = Post.objects.filter(author=request.user).order_by('-created_at')

        serializer = PostSerializer(posts, many=True)

        payload = {
            "posts": serializer.data,
            "pagination_data": {
                "current_page": page,
                "has_next": False
            }
        }
        return Response(payload)