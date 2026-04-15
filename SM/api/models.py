from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)

        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    profile_data = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)


    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def validateCredentials(self, password):
        return self.check_password(password)
    
    def getProfile(self):
        return self.profile_data
    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.username

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes_count = models.IntegerField(default=0)

    def validate(self):
        return len(self.content) > 0
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        return True
    
    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        return True
    
    def getLikeCount(self):
        return self.likes_count


class Like(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)


    def toggle(self):
        pass

    def checkExists(self, userId, postId):
        return Like.objects.filter(user_id=userId, post_id=postId).exists()
    
    def updateCount(self, postId):
        post = Post.objects.get(id=postId)
        post.likes_count = Like.objects.filter(post_id=postId).count()
        post.save()

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)

    
    def validate(self):
        return len(self.content) > 0

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        return True

    def getWithUserDetails(self):
        return {
            "content": self.content,
            "username": self.user.username,
            "created_at": self.created_at
        }
