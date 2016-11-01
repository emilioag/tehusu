from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from djserver.tehusu.serializers import UserSerializer, GroupSerializer
from django_redis import get_redis_connection
from pymongo import MongoClient
import datetime
import time
from djserver.tehusu.utils import buildChart

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class Dth11(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        client = MongoClient()
        db = client['test']
        col = db.test_collection
        return Response(buildChart(col.find()))

    def post(self, request, format=None):
        data = request.data
        con = get_redis_connection("default")
        client = MongoClient()
        db = client['test']

        temperature = data['temperature']
        humidity = data['humidity']
        instant = data['instant']

        last_update = con.get('last_update')

        if last_update is None:
            con.set('last_update', instant)

        last_update = float(last_update)

        instant = float(instant)

        if (instant - last_update) > 60:
            con.set('last_update', instant)
            db.test_collection.insert({
                '_id': datetime.datetime.fromtimestamp(instant).strftime('%d-%m-%Y %H:%M'),
                'temperature': temperature,
                'humidity': humidity
            })


        con.set('temperature', temperature)
        con.set('humidity', humidity)

        return Response({'message': 'lelele'}, status=status.HTTP_201_CREATED)
