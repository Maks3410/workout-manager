from rest_framework import serializers
from api.models import Exercise, Workout, Set


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'muscle_group', 'description']


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ['id', 'exercise', 'repetitions', 'weight']


class WorkoutSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True)  # Вложенные данные о подходах
    muscles_involved = serializers.SerializerMethodField()  # Поле для расчёта задействованных мышц

    class Meta:
        model = Workout
        fields = ['id', 'user', 'sets', 'date', 'name', 'muscles_involved']
        read_only_fields = ["user"]

    def get_muscles_involved(self, obj):
        # Собираем все группы мышц из подходов
        muscles = set()
        for s in obj.sets.all():
            muscles.add(s.exercise.muscle_group)
        return list(muscles)

    def create(self, validated_data):
        # Убираем данные о подходах из validated_data
        sets_data = validated_data.pop('sets')
        validated_data["user"] = self.context["request"].user

        # Создаем тренировку с переданным пользователем
        workout = Workout.objects.create(**validated_data)
        if sets_data:
            # Создаем подходы для тренировки
            for set_data in sets_data:
                Set.objects.create(workout=workout, **set_data)

        return workout

    def update(self, instance, validated_data):
        # Обновление тренировки, добавление новых подходов
        sets_data = validated_data.pop('sets', None)

        # Обновление полей тренировки
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Добавление новых подходов, если они есть
        if sets_data:
            for set_data in sets_data:
                Set.objects.create(workout=instance, **set_data)
        return instance
