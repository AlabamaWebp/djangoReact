from rest_framework import serializers
from .models import Pub, User, His


class CustomUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password') #  'email',
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class PubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pub
        fields = ['id', 'content', 'user']
        depth = 1


class PubpkSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Pub
        fields = '__all__'


class HisSerializer(serializers.ModelSerializer):
    class Meta:
        model = His
        fields = '__all__'
        depth = 1


