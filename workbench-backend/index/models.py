from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from enum import Enum

class DataType(Enum):
    """
    Enumeration of valid file types
    """
    pass
    # Leaving this blank until enum values are determined. 
    #NC=1
    #DAT=2
    #JSON=3

class BaseModel(models.Model):
    """
    A simple base model to subclass from when we want to keep track of create and modify dates
    """
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        Declare this class abstract
        """
        abstract = True

# Create your models here.
class Notification(models.Model):
    user = models.CharField(max_length=100)
    notification_list = models.TextField()

class DataFile(BaseModel):
    """
    Model of data stored by the users
    Inherit date fields from BaseModel
    """
    path = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, related_name='data_owner_user')
    allowed_access = models.ManyToManyField(User, related_name='allowed_access_users')
    data_type = models.IntegerField(DataType)
