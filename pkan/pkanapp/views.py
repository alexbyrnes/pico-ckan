from django.shortcuts import render_to_response
from django.template import RequestContext
from models import CkanDataset 
import datetime

def index(request):
    if request.method == 'POST':
        title = request.POST['title']
        url = request.POST['url']
        notes = request.POST['notes']

        dataset = CkanDataset()
        dataset.title = title
        dataset.url = url
        dataset.notes = notes

        dataset.save()

        template = 'index.html'
        params = {'Datasets': CkanDataset.objects}

    # Get all datasets from DB
    datasets = CkanDataset.objects 
    return render_to_response('index.html', {'Datasets': datasets},
                              context_instance=RequestContext(request))


def add(request):
    
    if request.method == 'POST':
        dataset.title = request.POST['title']
        dataset.url = request.POST['url']
        dataset.notes = request.POST['notes']

        dataset.save()
        template = 'index.html'
        params = {'Datasets': CkanDataset.objects}

    elif request.method == 'GET':
        template = 'add.html'
        params = {}

    return render_to_response(template, params, context_instance=RequestContext(request))
 

def update(request):
    id = eval("request." + request.method + "['id']")
    dataset = CkanDataset.objects(id=id)[0]
    
    if request.method == 'POST':
        # update field values and save to mongo
        dataset.title = request.POST['title']
        dataset.url = request.POST['url']
        dataset.notes = request.POST['notes']
        
        dataset.save()
        template = 'index.html'
        params = {'Datasets': CkanDataset.objects} 

    elif request.method == 'GET':
        template = 'update.html'
        params = {'dataset':dataset}
   
    return render_to_response(template, params, context_instance=RequestContext(request))
                              

def delete(request):
    id = eval("request." + request.method + "['id']")

    if request.method == 'POST':
        dataset = CkanDataset.objects(id=id)[0]
        dataset.delete() 
        template = 'index.html'
        params = {'Datasets': CkanDataset.objects} 
    elif request.method == 'GET':
        template = 'delete.html'
        params = { 'id': id } 

    return render_to_response(template, params, context_instance=RequestContext(request))
                              
    
