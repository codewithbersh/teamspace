from django.contrib import admin
from .models import TeamSpace, Member, Ticket, Assignee, Comment

admin.site.register(TeamSpace)
admin.site.register(Member)
admin.site.register(Ticket)
admin.site.register(Assignee)
admin.site.register(Comment)
