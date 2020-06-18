from django.contrib import admin
from .models import UserAccount

class UserAccountAdmin(admin.ModelAdmin):
    list_display=('id','name','email','is_staff','password')
    list_display_links = ('id','name')
    list_filter = ('is_staff',)
    list_editable = ('is_staff',)
    search_fields = ('name','email','is_staff')
    list_per_page = 10

admin.site.register(UserAccount,UserAccountAdmin)

