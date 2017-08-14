"""workbench URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from index import views as index_views
from file_manager import views as file_manager_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', index_views.index, name='index'),
    url(r'^login/?$', index_views.user_login, name='login'),
    url(r'^logout/?$', index_views.user_logout, name='logout'),
    url(r'^register/?$', index_views.user_register, name='register'),
    url(r'^workbench/?$', index_views.workbench, name='workbench'),
    url(r'^get_user_list/?$', index_views.get_user_list, name='getUserList'),
    url(r'^file_manager/get_data_set_list/?$', file_manager_views.get_data_set_list, name='getDataSetList'),
    url(r'^file_manager/get_data_set/?$', file_manager_views.get_data_set, name='getDataSet'),
    url(r'^file_manager/get_file_info/?$', file_manager_views.get_file_info, name='getFileInfo'),
    url(r'^file_manager/upload_dataset/(?P<dataset_name>.+)$', file_manager_views.upload_dataset, name='uploadDataSet'),
    url(r'^file_manager/delete_dataset/(?P<dataset_name>.+)$', file_manager_views.delete_dataset, name='deleteDataSet'),
    url(r'^file_manager/change_file_permissions/?$', file_manager_views.change_file_permissions, name='changeFilePermissions')
]
