from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from .models import Products, Category

@receiver(pre_delete,sender=Products, dispatch_uid="decrease_stock")
def decrease_stock(sender, **kwargs):
    product = kwargs['instance']
    print("product")
    if product.pk:
        orginal_stock = Category.objects.filter(pk=product.category_id)[0].stock
        Category.objects.filter(pk=product.category_id).update(stock=orginal_stock-1)
