from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('role', 'STAFF')
        extra_fields.setdefault('status', 'ACTIVE')
        return self.create_user(email, name, password, **extra_fields)

class User(AbstractBaseUser):
    ROLE_CHOICES = [
        ('STUDENT', 'Student'),
        ('STAFF', 'Staff'),
    ]
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='STUDENT')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        db_table = 'Users'

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.role == 'STAFF'

    @property
    def is_active_user(self):
        return self.status == 'ACTIVE'

    def has_perm(self, perm, obj=None):
        return self.role == 'STAFF'

    def has_module_perms(self, app_label):
        return self.role == 'STAFF'

class Resource(models.Model):
    STATUS_CHOICES = [
        ('AVAILABLE', 'Available'),
        ('UNAVAILABLE', 'Unavailable'),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50) # E.g. Lab, Classroom, etc.
    capacity = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')

    class Meta:
        db_table = 'Resources'
        indexes = [
            models.Index(fields=['type']),
        ]

    def __str__(self):
        return self.name

class Booking(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    booking_date = models.DateField()
    time_slot = models.CharField(max_length=20) # e.g. "10AM-12PM"
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Bookings'
        constraints = [
            models.UniqueConstraint(fields=['resource', 'booking_date', 'time_slot'], name='unique_double_booking')
        ]

    def __str__(self):
        return f"{self.resource.name} - {self.booking_date} ({self.time_slot})"

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'UserActivity'
        ordering = ['-login_time']

    def __str__(self):
        return f"{self.user.email} - {self.login_time}"
