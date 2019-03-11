# Django框架使用指南
基于python3.6 和 django2.1
### django常用命令
- python manage.py runserver 0.0.0.0:80000 启动服务器 
- python manage.py makemigrations          生成迁移文件 
- python manage.py migrate                 迁移数据库 
- python manage.py migrate                 --fake 迁移数据库遇到冲突 
- python manage.py inspectdb               反向生模型(models) 
- python manage.py collectstatic           收集静态文件
- python manage.py createsuperuser         创建管理员

### 安装
使用pip安装:

`pip install -r requirements.txt`

### 配置
配置都是在`setting.py`中
#### 数据库
修改`DjangoBlog/setting.py` 修改数据库配置，如下所示：
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'grocerdb',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        "OPTIONS": {
            'charset': 'utf8mb4',
            "init_command": "SET default_storage_engine=INNODB;"
        },
    }
}
```
#### ldap配置
```python
# ### ldap configuration ###
import ldap
from django_auth_ldap.config import LDAPSearch, PosixGroupType

base_dn = ''
AUTH_LDAP_SERVER_URI = ''
AUTH_LDAP_BIND_DN = ''
AUTH_LDAP_BIND_PASSWORD = ''
AUTH_LDAP_USER_SEARCH = LDAPSearch(base_dn, ldap.SCOPE_SUBTREE, "(uid=%(user)s)")
AUTH_LDAP_ALWAYS_UPDATE_USER = True

AUTH_LDAP_USER_ATTR_MAP = {  # key为数据库字段名，value为ldap中字段名，此字典解决django model与ldap字段名可能出现的不一致问题
    "username": "uid",
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail"
}


AUTHENTICATION_BACKENDS = (
    'django_auth_ldap.backend.LDAPBackend',   # 配置为先使用LDAP认证，如通过认证则不再使用后面的认证方式
    'django.contrib.auth.backends.ModelBackend',
)

```
#### 邮箱配置
```python
# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = ''
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_SUBJECT_PREFIX = '[Grocerシステム] '
EMAIL_USE_TLS = False  # 与SMTP服务器通信时，是否启动TLS链接(安全链接)port: EMAIL_PORT
EMAIL_USE_SSL = False  # 与SMTP服务器通信时，是否启动TLS链接(安全链接)port: EMAIL_PORT
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
```
### 开发流程

前端发送请求首先会由`back`目录下的`urls.py`分发到各个View, 底层view实现了http的get, post, delete, patch, update, 等方法drf框架对这些方法进行了最基本的实现, 只需要继承相应的mixin就可以, 比如post方法要继承CreateModelMixin, serializer是用来序列化数据, 验证数据的, 下面是一个restful风格的api具体实现:


#### 首先定义一个model:
```python
from django.db import models


class Opid(models.Model):
    eng = models.TextField(blank=True, null=True)
    jpn = models.TextField(blank=True, null=True)
```

#### View
```python
from rest_framework.viewsets import ModelViewSet
from .models import Opid
from .serializer import OpidSerializer


class OpidViewSet(ModelViewSet):
    """
    ModelViewSet 方法继承了全部的http方法
    """
    serializer_class = OpidSerializer
    queryset = Opid.objects.all()
```
#### Serializer
```python
from rest_framework import serializers
from .models import Opid


class OpidSerializer(serializers.ModelSerializer):

    class Meta:
        model = Opid
        fields = '__all__'
```
#### url
```python
from .views import OpidViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'opid', OpidViewSet, base_name='opid')
```
#### 前端请求方法对应的url
- get /opid/ 获取opid列表
- get /opid/1/ 获取id为1的opid详细
- post /opid/ 新规一个opid
- delete /opid/1/ 删除id为1的opid
- update /opid/1/ 完全更新id为1的opid
- patch /opid/1 局部更新opid为1的opid

#### 过滤
前端可以这样搜索   /opid/?englishstring=xx&japanese=xx
```python
from .filters import OpidFilter
from django_filters.rest_framework import DjangoFilterBackend


class OpidViewSet(ModelViewSet):
    serializer_class = OpidSerializer
    queryset = Opid.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_class = OpidFilter
```
filters.py
```python
import django_filters
from .models import Opid
from django.db.models import Q


class OpidFilter(django_filters.rest_framework.FilterSet):

    englishstring = django_filters.CharFilter(field_name='eng')
    japanese = django_filters.CharFilter(field_name='jpn')
    japanese_english_opid = django_filters.CharFilter(method='japaneseOrEnglishOrOpidFilter', help_text='英语日语搜索')

    def japaneseOrEnglishOrOpidFilter(self, queryset, name, value):
        return Opid.objects.filter(Q(jpn__contains=value) | Q(eng__contains=value)| Q(opid__contains=value))
    class Meta:
        model = Opid
        fields = ['englishstring', 'japanese', 'product']

```
#### 分页
前端可能发出这样的请求 opid/?pageNo=1&pageSize=10 pageNo是当前页码, pageSize是一页有多少条数据, drf自带的分页不是这种格式就需要自己重写方法
##### view
```python
from .filters import OpidFilter
from django_filters.rest_framework import DjangoFilterBackend


class OpidViewSet(ModelViewSet):
    serializer_class = OpidSerializer
    queryset = Opid.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_class = OpidFilter
    pagination_class = Pagination
```

```python
from collections import OrderedDict
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination


class Pagination(LimitOffsetPagination):
    # 默认每页显示的数据条数
    # default_limit = 20
    # URL中传入的显示数据条数的参数
    limit_query_param = 'pageSize'
    # URL中传入的数据位置的参数
    offset_query_param = 'pageNo'

    def paginate_queryset(self, queryset, request, view=None):
        self.count = self.get_count(queryset)
        self.limit = self.get_limit(request)
        if self.limit is None:
            return queryset
        _offset = self.get_offset(request)
        if _offset == 1:
            self.offset = 0
        elif _offset == 0:
            self.offset = _offset
        else:
            self.offset = (_offset - 1) * self.limit
        self.request = request
        if self.count > self.limit and self.template is not None:
            self.display_page_controls = True

        if self.count == 0 or self.offset > self.count:
            return []
        return list(queryset[self.offset:self.offset + self.limit])

    def get_paginated_response(self, data):
        return Response(OrderedDict([('count', self.count), ('results', data)]))
```


#### 更多功能请看这里
[api指南](http://drf.jiuyou.info/#/)
