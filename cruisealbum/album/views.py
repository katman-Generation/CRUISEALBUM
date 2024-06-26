from django.shortcuts import render

# Create your views here.
def homePage(request):
    """landing page"""
    return render(request, 'homePage.html')

def explore(request):
    """first page"""
    return render(request, 'explore.html')