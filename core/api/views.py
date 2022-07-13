from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Pub#, Ed, His
from .serializers import \
    UserSerializer, PubSerializer, CustomUserSerializer, PubpkSerializer#, EdSerializer, HisSerializer


class UserApi(generics.ListAPIView):
    permission_classes = (permissions.IsAdminUser,)    # ListCreateAPIView
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class ObtainTokenPairWithColorView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomUserCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PubApi(generics.ListCreateAPIView):
    queryset = Pub.objects.all()
    serializer_class = PubSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PubApiDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pub.objects.all()
    serializer_class = PubpkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class EdApi(generics.ListCreateAPIView):
#     queryset = Ed.objects.all()
#     serializer_class = EdSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#
# class HisApi(generics.ListCreateAPIView):
#     queryset = His.objects.all()
#     serializer_class = HisSerializer
#     permission_classes = [permissions.IsAuthenticated]
