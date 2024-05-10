from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import File

# Register your models here.
class FileAdmin(ModelAdmin):
    readonly_fields = ("slug",)
admin.site.register(File, FileAdmin)