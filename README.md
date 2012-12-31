pico-ckan
===================

A micro open data hub built on [Unix design principles] (http://en.wikipedia.org/wiki/Unix_philosophy).

## Install (Debian)

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


## Notes:

Postgres is required if you want to host data (rows and columns) on your own server.  Generally, pico-ckan, like [CKAN] (http://www.ckan.org) deals with metadata and leaves the possiblity for datastores open.  However, here is an entrely optional datastore that can be accessed through a simple API.  The goal is to develop a loosely coupled stack (like LAMP) with components that can be used together or separately.  Well-defined interfaces have been written among components wherever possible (the search component and Django, the search interface and the Solr library, data and metadata stores etc).  


## Additional features:

### Datastore

Install Postgres:

    $ sudo apt-get install postgresql

Install csvkit:

    $ pip install csvkit

Load some data:

    $ curl https://data.cityofchicago.org/api/views/28km-gtjn/rows.csv?accessType=DOWNLOAD | csvsql --no-constraints --insert --table firehouses --db "postgresql://odsuser:odspass@localhost/opendatastore"
    # May require additional postgres setup such as adding a password style user and enabling local logins


### Faceted search

Install [Solr 4] (http://wiki.apache.org/solr/SolrInstall) which allows automatic indexing with MongoDB. 

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


## Additional design notes and ways of extending the project

Open data software design (packages like CKAN, Open Data Catalog, among others) has the unfortunate impediment of being domain-free, or really, having to cope with data from too many domains*.  Even the domain of metadata or data about open data is subject to a lot of variation so that no specific tool can cope with all of the different schemata and other infrastructure components that need to be customized when they are installed in new environments (San Diego vs Boston vs Denver vs Chicago and on and on).  In keeping with this insurmountable constraint, pico CKAN aims to stop development at the point where it becomes difficult to modify the built-in schema.  It also helps with another great software design principle: Do the hard parts first (and leave things you'll never finish alone).  Pico CKAN has loose integration with a data store, and faceted search, two very hard but surmountable problems.  It does not attempt a plugin system (everyone who works on this stuff is very smart and they don't need one) or datatype detection (a side effect of automatic or automated data intake).  With these principles, I hope open data development gets universally easier, and continues to be lots and lots of fun.

*Basing your catalog around a CMS, which is also domain-free, is another strategy (used in DKAN and OGPL) and a good one.  Pico CKAN is another approach to the same problem.

**I've recently learned that this is similar to [Mingus] (https://github.com/montylounge/django-mingus), a Django blog app that defines no database models.
