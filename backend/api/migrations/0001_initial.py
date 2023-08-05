# Generated by Django 4.2.3 on 2023-08-04 18:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TeamSpace',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=12)),
                ('code', models.CharField(blank=True, max_length=8, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='my_team_spaces', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_on'],
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ticket_id', models.CharField(blank=True, max_length=6, unique=True)),
                ('type', models.CharField(choices=[('FR', 'feature reqeust'), ('IS', 'issue'), ('IM', 'improvement')], default='IS', max_length=2)),
                ('title', models.CharField(max_length=64)),
                ('description', models.TextField(max_length=512)),
                ('status', models.CharField(choices=[('PE', 'pending'), ('IP', 'in progress'), ('CO', 'completed'), ('FR', 'for review'), ('RO', 'reopen')], default='PE', max_length=2)),
                ('priority', models.CharField(choices=[('LW', 'low'), ('MD', 'medium'), ('HI', 'high'), ('IM', 'immediate')], default='MD', max_length=2)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('starting_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('archived', models.BooleanField(default=False)),
                ('assignee', models.ManyToManyField(blank=True, related_name='assigned_tickets', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_tickets', to=settings.AUTH_USER_MODEL)),
                ('team_space', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='api.teamspace')),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('role', models.CharField(choices=[('SU', 'superuser'), ('AD', 'admin'), ('NA', 'non-admin')], default='NA', max_length=2)),
                ('is_verified', models.BooleanField(blank=True, default=False)),
                ('nickname', models.CharField(blank=True, max_length=16, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('team_space', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='api.teamspace')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='all_team_spaces', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date_joined'],
                'unique_together': {('team_space', 'user')},
            },
        ),
    ]
