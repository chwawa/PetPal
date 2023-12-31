# Generated by Django 4.2.7 on 2023-12-09 21:34

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ShelterBlog', '0002_shelterblog_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shelterblog',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_shelter_blogs', to=settings.AUTH_USER_MODEL),
        ),
    ]
