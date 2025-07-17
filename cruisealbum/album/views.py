from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import City, Post
from django.http import FileResponse
from .serializers import CitySerializer, PostSerializer

@api_view(['GET'])
def city_list(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_city(request):
    serializer = CitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def posts_by_city(request, id):
    posts = Post.objects.filter(city_id=id)
    if not posts.exists():
        return Response({"detail": "City or posts not found"}, status=404)

    city_info = posts.first().city.info if posts else ''
    serializer = PostSerializer(posts, many=True, context={'request': request})
    return Response({
        "city_info": city_info,
        "posts": serializer.data
    })

@api_view(['POST'])
def like_post(request, id):
    try:
        post = Post.objects.get(id=id)
        post.no_of_likes += 1
        post.save()
        return Response({"likes": post.no_of_likes})
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_post_image(request, id):
    try:
        post = Post.objects.get(id=id)

        # Increment download count
        post.no_of_downloads += 1
        post.save()

        # Return file response
        return FileResponse(post.image.open(), as_attachment=True, filename=post.image.name)

    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=404)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "User created"}, status=status.HTTP_201_CREATED)



# Create your views here.
@login_required(login_url='testlog')
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
    return render(request, 'index.html', {'city_posts': city_posts,'city_id': city_id, 'city': city})

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


@login_required(login_url='testlog')
def uploadCity(request):
    """function for creating new post"""
    if request.method == 'POST':
        name = request.POST['name']
        country = request.POST['country']
        image = request.FILES.get('image')
        info = request.POST['info']
        
        cname = City.objects.filter(name__iexact=name, country__iexact=country )
        
        if cname.exists():
            messages.info(request, 'City already exits')
            return redirect('uploadCity')
        city = City.objects.create(name=name, country=country, image=image, info=info)
        city.save()
        messages.info(request, 'City succesfully saved')
        return redirect('uploadCity')
    return render(request, 'uploadCity.html')

def testlog(request):
    """function to responce to people not logged in"""
    return render(request, 'testlog.html')
    