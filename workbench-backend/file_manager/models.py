from __future__ import unicode_literals
from enum import Enum

from django.db import models
from django.contrib.auth.models import User


class DataType(Enum):
    """
    Enumeration of valid file types
    """
    NETCDF = 1
    TEXT = 2
    JSON = 3
    NAMELIST = 4
    IMAGE = 5
    XML = 6


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
        ordering = ["created_date"]


class DataFile(BaseModel):
    """
    Model of data stored by the users
    Inherit date fields from BaseModel
    """
    path = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, related_name='data_owner_user')
    allowed_access = models.ManyToManyField(User, related_name='file_allowed_access_users')
    data_type = models.IntegerField(DataType)

    def toDict(self):
        """
        Dump contents to dict
        """
        return {
            'path': self.path,
            'display_name': self.display_name,
            'owner': self.owner.username,
            'allowed_access': [user.username for user in self.allowed_access.all()],
            'data_type': self.data_type
        }


class DataSet(BaseModel):
    """
    A container for data files, to group them into sets of data
    """
    name = models.CharField(max_length=255)
    allowed_access = models.ManyToManyField(User, related_name='data_set_allowed_access_users')
    file_list = models.ManyToManyField(DataFile, related_name='data_set_contents')
    metadata = models.CharField(max_length=1023)
    owner = models.ForeignKey(User, related_name='dataset_owner')

    def toDict(self):
        """
        Dump contents to a dict
        """
        return {
            'name': self.name,
            'metadata': self.metadata,
            'allowed_access': [user.username for user in self.allowed_access.all()],
            'file_list': [file.display_name for file in self.file_list.all()],
            'owner': str(self.owner)
        }
