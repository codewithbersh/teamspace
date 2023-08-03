# Generated by Django 4.2.3 on 2023-08-03 06:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_teamspace_created_on'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='member',
            options={'ordering': ['-date_joined']},
        ),
        migrations.AlterModelOptions(
            name='teamspace',
            options={'ordering': ['-created_on']},
        ),
        migrations.AddField(
            model_name='member',
            name='date_joined',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]