# Generated by Django 3.0 on 2020-02-02 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20200202_1849'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manga',
            name='tags',
            field=models.ManyToManyField(related_name='tracks', to='core.Tag'),
        ),
    ]