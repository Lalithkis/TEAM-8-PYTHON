from django.db import models

class User(models.Model):
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
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Users'  # Match the schema table name

    def __str__(self):
        return self.name

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
        db_table = 'Resources' # Match the schema table name
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
        db_table = 'Bookings' # Match the schema table name
        constraints = [
            models.UniqueConstraint(fields=['resource', 'booking_date', 'time_slot'], name='unique_double_booking')
        ]

    def __str__(self):
        return f"{self.resource.name} - {self.booking_date} ({self.time_slot})"
