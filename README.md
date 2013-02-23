pico-ckan
===================

A micro open data hub built on Unix design principles.

[Screenshot](https://raw.github.com/alexbyrnes/pico-ckan/master/pico-ckan-health-facet.png) / [Video](http://www.youtube.com/watch?v=1VL7y9VS5uw)


## Full Install (Debian)

Install python and MongoDB:

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

Load some metadata (works with any CKAN end point):

    $ curl http://opendata.cmap.illinois.gov/api/action/package_show?id=4cb2a4e2-8aaa-484d-8a9f-0874e70697fe | python filter_open_json.py | mongoimport -d metadb -c metadata

View!

    http://localhost:8000/


## Additional features:

### Datastore

Pico-ckan, like [CKAN] (http://www.ckan.org) deals with metadata and leaves the choice of datastores open.  

* [OpenDataStack] (https://github.com/alexbyrnes/OpenDataStack): Easy to populate and deploy
* [CartoDB] (https://github.com/CartoDB/cartodb20): Interactive maps, other Geo functions
* [DataBeam] (https://github.com/philipashlock/DataBeam): Adds an API to any CSV


### Faceted search

Install [Solr 4] (http://wiki.apache.org/solr/SolrInstall), which allows automatic indexing with MongoDB. 

Link Solr schema to included schema:

    sudo mv /etc/solr/conf/schema.xml /etc/solr/conf/schema.xml.bak
    sudo ln -s ~/pico-ckan/schema.xml /etc/solr/conf/schema.xml

Restart Solr (there are various ways to do this.  The easiest is pointing your browser at http://localhost:8983/solr/admin/, going to Core Admin and then Reload.):

    http://localhost:8983/solr/admin
    
Install mongo-connector

    $ pip install mongo-connector

Start up mongo-connector

    $ python ./mongo_connector.py -m localhost:27017 -t http://localhost:8983/solr -o config.txt -n metadb.metadata -u _id -d ./doc_managers/solr_doc_manager.py

Any data you add to the metadb database and metadata collection will be synced with the search index.


