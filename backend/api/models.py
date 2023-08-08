from django.db import models
from accounts.models import User
import uuid
from django.utils.crypto import get_random_string
from simple_history.models import HistoricalRecords


class TeamSpace(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="my_team_spaces"
    )
    name = models.CharField(max_length=12)
    code = models.CharField(max_length=8, blank=True, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()

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
    date_joined = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = (
            "team_space",
            "user",
        )
        ordering = ["-date_joined"]

    def __str__(self):
        return f"{self.user.email} joined {self.team_space.name}"


class Ticket(models.Model):
    TYPE_CHOICES = (
        ("FR", "feature reqeust"),
        ("IS", "issue"),
        ("IM", "improvement"),
    )

    STATUS_CHOICES = (
        ("PE", "pending"),
        ("IP", "in progress"),
        ("CO", "completed"),
        ("FR", "for review"),
        ("RO", "reopen"),
    )

    PRIORITY_CHOICES = (
        ("LW", "low"),
        ("MD", "medium"),
        ("HI", "high"),
        ("IM", "immediate"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket_id = models.CharField(blank=True, max_length=6, unique=True)
    team_space = models.ForeignKey(
        TeamSpace, on_delete=models.CASCADE, related_name="tickets"
    )
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, default="IS")
    title = models.CharField(max_length=64)
    description = models.TextField(max_length=512, blank=True, null=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default="PE")
    priority = models.CharField(max_length=2, choices=PRIORITY_CHOICES, default="MD")
    assignee = models.ManyToManyField(User, related_name="assigned_tickets", blank=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_tickets"
    )
    created_on = models.DateTimeField(auto_now_add=True)
    starting_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    archived = models.BooleanField(default=False)
    history = HistoricalRecords(m2m_fields=[assignee])

    def save(self, *args, **kwargs):
        if not self.ticket_id:
            self.ticket_id = self.generate_unique_ticket_id()
        super().save(*args, **kwargs)

    def generate_unique_ticket_id(self):
        length = 6
        while True:
            ticket_id = get_random_string(length).upper()
            if not Ticket.objects.filter(ticket_id=ticket_id).exists():
                return ticket_id

    def __str__(self):
        return self.ticket_id


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member = models.ForeignKey(
        Member, on_delete=models.CASCADE, related_name="comments"
    )
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, related_name="comments"
    )
    description = models.CharField(max_length=64)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    has_been_edited = models.BooleanField(default=False, blank=True)
    has_been_deleted = models.BooleanField(default=False, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.description

    class Meta:
        ordering = ["-created"]
