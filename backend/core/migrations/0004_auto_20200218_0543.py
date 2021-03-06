# Generated by Django 3.0 on 2020-02-18 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_user_bookmarks'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rank',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.CharField(choices=[('BG', 'Новичок'), ('MD', 'Завсегдатый'), ('HG', 'Боженька'), ('MG', 'Модератор')], default='BG', max_length=2)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='rank',
            field=models.ManyToManyField(to='core.Rank'),
        ),
    ]
