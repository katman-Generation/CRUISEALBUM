from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
#import wikipedia
from .models import City, Post



# Create your views here.
@login_required
def uploadPost(request):
    """this is the page to create a new city"""
    if request.method == 'POST':
        name = request.POST['name']
        image = request.FILES.get('image')
        caption = request.POST['caption']
        
        cname = get_object_or_404(City, name__iexact=name)
        
        if cname:
            post = Post.objects.create(city=cname, caption=caption, image=image)
            post.save()
            messages.info(request, 'Post succesfully saved')
            return redirect('uploadPost')
        messages.info(request, 'City do not Exist')
        return redirect('uploadPost')
    return render(request, 'uploadpost.html')

def about(request):
    """landing page"""
    return render(request, 'homePage.html')

def explore(request):
    """second page"""
    cities = City.objects.all()
    return render(request, 'explore.html', {'cities': cities })

def download_image(request, image_id):
    """a function to download the imagies"""
    photo = Post.objects.get(id=image_id)
    response = HttpResponse(photo.image, content_type='photo/jpeg')
    response['Content-Disposition'] = 'attachment; filename="image.jpg"'
    photo.no_of_downloads += 1
    photo.save()
    return response

def index(request, city_id):
    """the first page showing cities previews"""
    city = City.objects.get(id=city_id)
    city_posts = Post.objects.filter(city=city)
   # search_query = request.GET.get('city.name ' + 'city')
   # results = wikipedia.search(search_query)
    #page = wikipedia.page(results[0])
    
    return render(request, 'index.html', {'city_posts': city_posts})

def likes(request, post_id):
    """the function for likes"""
    posts_likes = get_object_or_404(Post, id=post_id)
    posts_likes.no_of_likes += 1
    print(posts_likes)
    posts_likes.save()
    cityy = posts_likes.city
    cityyy = City.objects.get(name=cityy)
    city_id = cityyy.id
    return redirect('index', city_id=city_id)


@login_required
def uploadCity(request):
    if request.method == 'POST':
        city = request.POST['city']
        country = request.POST['country']
        image = request.FILES.get('image')
        
        cname = City.objects.filter(name__iexact=name, country__iexact=country )
        
        if cname.exists():
            messages.info(request, 'City already exits')
            return redirect('uploadCity')
        city = City.objects.create(name=name, country=country, image=image)
        city.save()
        messages.info(request, 'City succesfully saved')
        return redirect('uploadCity')
    return render(request, 'uploadCity.html')
    