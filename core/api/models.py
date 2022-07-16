from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(blank=True)
    # REQUIRED_FIELDS = ["password"]


class Pub(models.Model):
    user = models.ForeignKey('User', on_delete=models.PROTECT)    # related_name="User",
    content = models.TextField()

    def __str__(self):
        return self.content


class His(models.Model):
    user = models.ForeignKey('User', on_delete=models.PROTECT)
    last_pub = models.TextField(null=True)
    pub = models.TextField()
    action = models.CharField(max_length=14)

