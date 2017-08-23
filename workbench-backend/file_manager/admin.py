from django.contrib import admin
from .models import DataFile, DataSet, GlobusAuth, GlobusNode

admin.site.register(DataFile)
admin.site.register(DataSet)
admin.site.register(GlobusAuth)
admin.site.register(GlobusNode)
