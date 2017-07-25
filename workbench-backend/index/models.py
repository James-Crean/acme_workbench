from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Notification(models.Model):
    user = models.CharField(max_length=100)
    notification_list = models.TextField()