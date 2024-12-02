from django.contrib.auth.models import User
from django.db import models


class Exercise(models.Model):
    name = models.CharField(max_length=100, unique=True)
    muscle_group = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Workout(models.Model):
    name = models.CharField(max_length=30, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Workout {self.id} by {self.user.username}"


class Set(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='sets')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='sets')
    repetitions = models.IntegerField()
    weight = models.FloatField()

    def __str__(self):
        return f"{self.repetitions} x {self.weight}kg - {self.exercise.name}"
