from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Products, Category
from .serializers import ProductsSerializer, CategorySerializer

class ProductsList(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@api_view(['GET',])
def filter_products(request,pk):
    try:
        products = Products.objects.filter(category_id=pk)
    except Products.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':    
        serializer = ProductsSerializer(products,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)




