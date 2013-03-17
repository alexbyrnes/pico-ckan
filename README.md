pico-ckan
===================

A micro open data hub built on [Unix design principles](http://en.wikipedia.org/wiki/Unix_philosophy).

[Screenshot](https://github.com/alexbyrnes/pico-ckan/blob/master/screenshot_markup.md) / [Video](http://www.youtube.com/watch?v=1VL7y9VS5uw)

## Quick Install (Solr + Any web page)

Download/Extract Solr:

    $ curl http://apache.mesi.com.ar/lucene/solr/4.2.0/solr-4.2.0.tgz | tar xz

(Please replace with another [solr mirror](http://www.apache.org/dyn/closer.cgi/lucene/solr/4.2.0))

Copy schema to Solr:

    $ cp pico-ckan/schema.xml solr-4.2.0/solr/example/solr/collection1/conf/

Start Solr server:

    $ java -jar solr-4.2.0/example/start.jar &

Add sample dataset:

    $ curl 'http://localhost:8983/solr/update/json?commit=true' --data-binary @pico-ckan/sample.json -H 'Content-type:application/json'

Test:

    $ curl http://localhost:8983/solr/collection1/select?q=*:*

Open [example.html](https://github.com/alexbyrnes/pico-ckan/blob/master/example.html) in your favorite browser.  (Assumes Solr install at localhost.)


## Adapting an existing page to use the search elements

Include the [ajax-solr directory] (https://github.com/alexbyrnes/pico-ckan/tree/master/pkan/pkanapp/static/js/ajax-solr).  Then add these elements to the body of the page:

Search box:

    <input type="text" id="query" class="ac_input">

Search results:

    <div id='docs'></div>

Facet menu:

    <section class="module module-narrow module-shallow"></section>

Pager:

    <ul id='pager'></ul>

[Example with styles and Javascript includes](https://github.com/alexbyrnes/pico-ckan/blob/master/example.html)



## Full Install (Ubuntu 12.04)

*The full install uses Django/MongoEngine to edit datasets, and mongo-connector to sync MongoDB and Solr.  Use this route if you want flexibility transforming datasets, and a formal Create, Update, and Delete interface.*

Install python and MongoDB ([more info](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)):

    $ sudo apt-get install python-pip python-dev build-essential mongodb-10gen

Create and activate a virtual environment (recommended):

    $ virtualenv picoenv
    $ . picoenv/bin/activate

Install python libraries (Django, MongoEngine):

    $ cd pico-ckan
    $ python setup.py install 

Start up Django:

    $ cd pkan
    $ python manage.py runserver

Load some metadata (works with any CKAN API):

    $ curl http://opendata.cmap.illinois.gov/api/action/package_show?id=4cb2a4e2-8aaa-484d-8a9f-0874e70697fe | python filter_open_json.py | mongoimport -d metadb -c metadata

For more information on loading metadata and data see [OpenDataStack] (https://github.com/alexbyrnes/OpenDataStack)

Install mongo-connector

    $ pip install mongo-connector

Start up mongo-connector

    $ python ./mongo_connector.py -m localhost:27017 -t http://localhost:8983/solr -o config.txt -n metadb.metadata -u _id -d ./doc_managers/solr_doc_manager.py

Any data you add to the metadb database and metadata collection will be synced with the search index.


## Additional features:

### Datastore

Pico-ckan, like [CKAN] (http://www.ckan.org) deals with metadata and leaves the choice of datastores open.  

* [OpenDataStack] (https://github.com/alexbyrnes/OpenDataStack): Easy to populate and deploy
* [CartoDB] (https://github.com/CartoDB/cartodb20): Interactive maps, other Geo functions
* [DataBeam] (https://github.com/philipashlock/DataBeam): Add an API to any CSV

    
