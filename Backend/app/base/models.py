from django.db import models
from django.core.validators import EmailValidator, MinLengthValidator
from django.db.models import signals
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
import uuid

class File(models.Model):
    title = models.CharField(max_length=100, unique=True)
    file = models.FileField(upload_to="uploads/")
    slug = models.SlugField(unique=True, blank=True, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-created',]

@receiver(post_save, sender=File)
def post_save_receiver(sender,instance, created, **kwargs):
    if created:
        title = instance.title
        unique_id = str(uuid.uuid4())
        print(title)
        instance.slug = slugify(f"{title} {unique_id}")
        instance.save()
        