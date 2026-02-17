from rest_framework import serializers
from .models import User, Resource, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'role', 'status', 'password', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True},
            'status': {'read_only': True}, # Default ACTIVE
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    resource_details = ResourceSerializer(source='resource', read_only=True)
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'resource', 'booking_date', 'time_slot', 'status', 'created_at', 'resource_details', 'user_details']
        read_only_fields = ['status', 'created_at', 'user']

    def validate(self, data):
        resource = data.get('resource')
        booking_date = data.get('booking_date')
        time_slot = data.get('time_slot')

        # Check for conflicts excluding rejected bookings
        # Note: If updating an existing booking, exclude self from check
        qs = Booking.objects.filter(
            resource=resource, 
            booking_date=booking_date, 
            time_slot=time_slot
        ).exclude(status='REJECTED')

        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            raise serializers.ValidationError({
                "non_field_errors": ["This resource is already booked for the selected date and time slot."]
            })
        
        return data

class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status']

    def validate_status(self, value):
        if value not in ['APPROVED', 'REJECTED']:
            raise serializers.ValidationError("Status can only be updated to APPROVED or REJECTED.")
        return value
