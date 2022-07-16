from rest_framework import viewsets
from django.db import models
from rest_framework.permissions import IsAuthenticated
from .models import Pub
from .serializers import PubSerializer


class PublicationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Pub.objects.order_by("content")
    serializer_class = PubSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only contact about current authenticated user
        # qs = qs.filter(user=self.request.user)

        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs = qs.filter(
                models.Q(content__icontains=search)
                # | models.Q(user__icontains=search)
            )
        return qs
