from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from api.models import Exercise, Workout
from api.serializers import ExerciseSerializer, WorkoutSerializer


class ExerciseViewSet(ModelViewSet):
    """
    ViewSet для управления упражнениями.
    """
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Чтение доступно всем, изменение — только авторизованным


class WorkoutViewSet(ModelViewSet):
    """
    ViewSet для управления тренировками.
    """
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]  # Доступ только авторизованным пользователям

    def get_queryset(self):
        # Фильтруем тренировки по текущему пользователю
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Получаем текущего пользователя из запроса
        user = self.request.user
        # Добавляем пользователя в данные для создания тренировки
        serializer.save(user=user)
