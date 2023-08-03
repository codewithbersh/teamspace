from django.db import models
from accounts.models import User
import uuid
from django.utils.crypto import get_random_string


class TeamSpace(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="my_team_spaces"
    )
    name = models.CharField(max_length=12)
    code = models.CharField(max_length=8, blank=True, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_on"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_unique_code()
        super().save(*args, **kwargs)

    def generate_unique_code(self):
        length = 8
        while True:
            code = get_random_string(length).upper()
            if not TeamSpace.objects.filter(code=code).exists():
                return code


class Member(models.Model):
    ROLE_CHOICES = (
        ("SU", "superuser"),
        ("AD", "admin"),
        ("NA", "non-admin"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    team_space = models.ForeignKey(
        TeamSpace, on_delete=models.CASCADE, related_name="members"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="all_team_spaces"
    )
    role = models.CharField(max_length=2, choices=ROLE_CHOICES, default="NA")
    is_verified = models.BooleanField(default=False, blank=True)
    nickname = models.CharField(max_length=16, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "team_space",
            "user",
        )
        ordering = ["-date_joined"]

    def __str__(self):
        return f"{self.user.email} joined {self.team_space.name}"
