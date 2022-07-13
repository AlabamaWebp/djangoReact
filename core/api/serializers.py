from rest_framework import serializers
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Pub, User#, His, Ed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # exclude = ('password', )
        fields = ['id', 'email', 'username']

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#
#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)
#
#         # Add custom claims
#         token['fav_color'] = user.fav_color
#         return token


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class PubSerializer(serializers.ModelSerializer):
    # user = serializers.CharField(source='User.username', read_only=True)

    class Meta:
        model = Pub
        # fields = '__all__'
        fields = ['id', 'content', 'user']
        # exclude = ['password']
        depth = 1


class PubpkSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Pub
        fields = '__all__'

#
# class EdSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Ed
#         fields = "__all__"
#
#
# class HisSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = His
#         fields = "__all__"
