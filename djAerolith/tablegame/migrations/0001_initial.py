# -*- coding: utf-8 -*-


from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.IntegerField(blank=True, help_text=b'An action performed in the room, either by a user or by the system (e.g. XYZ leaves room.', null=True, choices=[(1, b"has changed the room's description."), (2, b'has joined the room.'), (3, b'has left the room.')])),
                ('text', models.TextField(help_text=b'A message, either typed in by a user or generated by the system.', null=True, blank=True)),
                ('unix_timestamp', models.FloatField(help_text=b'Unix timestamp when this message was inserted into the database.', editable=False)),
                ('created', models.DateTimeField(editable=False)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)),
            ],
        ),
    ]
