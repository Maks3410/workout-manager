from django.contrib import admin
from api.models import Exercise, Workout, Set


# Настройка отображения модели Exercise
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'muscle_group', 'description']
    search_fields = ['name', 'muscle_group']
    list_filter = ['muscle_group']


# Настройка отображения модели Set (подходы)
class SetAdmin(admin.ModelAdmin):
    list_display = ['id', 'exercise', 'repetitions', 'weight', 'workout']
    search_fields = ['exercise__name', 'workout__id']
    list_filter = ['exercise', 'workout']


# Настройка отображения модели Workout (тренировки)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'date']
    search_fields = ['user__username', 'date']
    list_filter = ['date', 'user']


# Регистрируем модели и их конфигурации
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Set, SetAdmin)
admin.site.register(Workout, WorkoutAdmin)
