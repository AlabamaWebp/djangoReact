from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class User(models.Model):
#     username = models.CharField(unique=True, max_length=20)
#     email = models.EmailField(unique=True, max_length=100)
#     password = models.CharField(max_length=100)


class User(AbstractUser):
    # pass
    # username = models.CharField(unique=True, max_length=20)
    email = models.EmailField(unique=True, max_length=100)
    # password = models.CharField(max_length=100)


class Pub(models.Model):
    user = models.ForeignKey('User', on_delete=models.PROTECT)    # related_name="User",
    content = models.TextField()

    def __str__(self):
        return self.content


# class His(models.Model):
#     user = models.ForeignKey('User', on_delete=models.PROTECT)
#     pub = models.ForeignKey(Pub, on_delete=models.PROTECT)
#
#
# class Ed(models.Model):
#     user = models.ForeignKey('User', on_delete=models.PROTECT)
#     pub = models.ForeignKey(Pub, on_delete=models.PROTECT)
