from django.db import models
from datetime import datetime

# Create your models here.


class City(models.Model):
    """the class to store details about the city"""
    name = models.CharField(max_length=40)
    country = models.CharField(max_length=40)
    image = models.ImageField(upload_to='media/city_images', default='maze.jpg')
    
    
    def __str__(self):
        return self.name
    
class Post(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    image = models.ImageField(upload_to='media/post_images', default='maze.jpg')
    caption = models.TextField(max_length=200, blank=True)
    no_of_likes = models.IntegerField(default=0)
    no_of_downloads = models.IntegerField(default=0)
    
    def __str__(self):
        return self.city.name