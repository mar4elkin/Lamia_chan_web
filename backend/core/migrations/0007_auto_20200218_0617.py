# Generated by Django 3.0 on 2020-02-18 03:17

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20200218_0549'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('body', tinymce.models.HTMLField()),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='rank',
            field=models.CharField(choices=[('Новичок', 'Новичок'), ('Завсегдатый', 'Завсегдатый'), ('Боженька', 'Боженька'), ('Модератор', 'Модератор'), ('Жидо-скриптизер', 'Жидо-скриптизер'), ('Хозяин-питона', 'Хозяин-питона')], default='Новичок', max_length=30),
        ),
    ]
