# Generated by Django 4.2.7 on 2023-12-09 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_customuser_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_pic',
            field=models.FileField(blank=True, null=True, upload_to='P3/backend/media/'),
        ),
    ]