# Generated by Django 5.0.6 on 2024-07-04 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('album', '0002_alter_post_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='image',
            field=models.ImageField(default='maze.jpg', upload_to='media/city_images'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(default='maze.jpg', upload_to='media/post_images'),
        ),
    ]
