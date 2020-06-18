from django.contrib import admin
from .models import Category, Products

class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id','name','price','category')
    list_display_links = ('id','name')
    list_filter = ('category',)
    list_editable = ('category',)
    search_fields = ('category',)
    list_per_page = 5

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name','stock')
    list_display_links = ('id','name')


admin.site.register(Products, ProductsAdmin)
admin.site.register(Category, CategoryAdmin)
    