# Generated by Django 3.0 on 2020-02-02 21:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20200202_2021'),
    ]

    operations = [
        migrations.CreateModel(
            name='DateUp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
        migrations.AddField(
            model_name='manga',
            name='status_of_manga',
            field=models.CharField(default='Выпускается', max_length=500),
        ),
        migrations.AddField(
            model_name='manga',
            name='upload_date',
            field=models.ManyToManyField(to='core.DateUp'),
        ),
    ]