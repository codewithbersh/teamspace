# Generated by Django 4.2.3 on 2023-08-05 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_ticket_end_date_alter_ticket_starting_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='starting_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]