# Generated by Django 3.0 on 2020-02-18 03:20

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20200218_0617'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('image', models.ImageField(upload_to='news')),
                ('body', tinymce.models.HTMLField()),
            ],
        ),
        migrations.DeleteModel(
            name='News',
        ),
    ]