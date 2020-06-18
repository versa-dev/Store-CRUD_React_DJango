from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class ProductsConfig(AppConfig):
    name = 'products'
    verbose_name = _("Products")

    def ready(self):
        from . import signals
