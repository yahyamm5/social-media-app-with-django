from rest_framework import serializers
from .models import User,Comment,Like,Post
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    def update( instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
            
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance
    

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id','content','user','username','post','created_at']
        read_only_fields = ['user']

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True,read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'author', 'author_username', 'created_at', 'updated_at', 'likes_count', 'comments']
        read_only_fields = ['author', 'likes_count']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']
        read_only_fields = ['user']

class FeedSerializer(serializers.Serializer):
    posts = PostSerializer(many=True)
    pagination_data = serializers.DictField()


class PersonalFeed(serializers.Serializer):
    posts = PostSerializer(many=True)
    pagination_data = serializers.DictField()
