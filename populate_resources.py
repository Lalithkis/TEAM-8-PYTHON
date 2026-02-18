
import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_resource_system.settings')
django.setup()

from resources.models import Resource

def populate():
    resources = [
        {"name": "Computer Lab A", "type": "Lab", "capacity": 30},
        {"name": "Computer Lab B", "type": "Lab", "capacity": 25},
        {"name": "Lecture Hall 101", "type": "Classroom", "capacity": 100},
        {"name": "Lecture Hall 102", "type": "Classroom", "capacity": 80},
        {"name": "Main Auditorium", "type": "Event Hall", "capacity": 500},
        {"name": "Seminar Room", "type": "Event Hall", "capacity": 50},
        {"name": "Physics Lab", "type": "Lab", "capacity": 20},
        {"name": "Chemistry Lab", "type": "Lab", "capacity": 20},
        {"name": "Library Discussion Room", "type": "Study Room", "capacity": 10},
    ]

    print("Seeding resources...")
    for r in resources:
        obj, created = Resource.objects.get_or_create(
            name=r["name"],
            defaults={
                "type": r["type"],
                "capacity": r["capacity"],
                "status": "AVAILABLE"
            }
        )
        if created:
            print(f"Created: {r['name']}")
        else:
            print(f"Already exists: {r['name']}")
    print("Done!")

if __name__ == '__main__':
    populate()
