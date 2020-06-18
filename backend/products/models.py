from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Products(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.pk:
            orginal_stock = Category.objects.filter(pk=self.category_id)[0].stock
            Category.objects.filter(pk=self.category_id).update(stock=orginal_stock+1)
        super().save(*args, **kwargs)
    

