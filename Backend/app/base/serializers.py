from rest_framework import serializers
from .models import File
from rest_framework.validators import ValidationError


class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=True)

    def validate(self, attrs):
        uploaded_file = attrs.get('file', None)
        # Seek back to the beginning of the file after previous reads
        if uploaded_file:
            uploaded_file.seek(0)

            # Access file-related information
            file_content = uploaded_file.read()
            file_name = uploaded_file.name
            file_type = uploaded_file.content_type
            file_size = uploaded_file.size

            if (not file_name.endswith(".csv")):
                raise ValidationError(
                    detail="Please ensure to upload csv file")
        else:
            raise ValidationError(detail="No dataset found")

        return super().validate(attrs)

    class Meta:
        model = File
        read_only_fields = ['slug',]
        fields = "__all__"
