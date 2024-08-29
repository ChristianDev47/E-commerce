from rest_framework import generics, status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserAddress, UserPhoneNumber
from .serializers import (
    UserReadSerializer,
    UserWriteSerializer,
    UserAddressReadSerializer,
    UserAddressWriteSerializer,
    UserPhoneNumberReadSerializer,
    UserPhoneNumberWriteSerializer,
    LoginSerializer,
    PasswordUpdateSerializer,
    LogoutSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return UserWriteSerializer
        return UserReadSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = UserAddress.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return UserAddressWriteSerializer
        return UserAddressReadSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

class UserPhoneNumberViewSet(viewsets.ModelViewSet):
    queryset = UserPhoneNumber.objects.all().order_by("id");

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return UserPhoneNumberWriteSerializer
        return UserPhoneNumberReadSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all().order_by("id")
    permission_classes = (AllowAny,)
    serializer_class = UserWriteSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        RefreshToken.for_user(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_200_OK)
    
class UpdatePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all().order_by("id")
    serializer_class = PasswordUpdateSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_serializer = UserWriteSerializer(user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    serializer_class = LogoutSerializer  

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
