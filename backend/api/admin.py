from django.contrib import admin
from .models import TeamSpace, Member, Ticket, Comment

admin.site.register(TeamSpace)
admin.site.register(Member)
admin.site.register(Ticket)
admin.site.register(Comment)
