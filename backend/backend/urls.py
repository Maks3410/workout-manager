from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ExerciseViewSet, WorkoutViewSet

router = DefaultRouter()
router.register('exercises', ExerciseViewSet, basename='exercise')
router.register('workouts', WorkoutViewSet, basename='workout')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),  # JWT токены и другие эндпоинты Djoser
    path('auth/', include('djoser.urls.jwt')),  # JWT токены
    path('', include(router.urls)),  # Подключаем маршруты для тренировок и упражнений
]
