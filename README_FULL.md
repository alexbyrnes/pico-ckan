pico-ckan
===================


## Full Install (Ubuntu 12.04)

Install python and MongoDB ([more info](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)):

    $ sudo apt-get install python-pip python-dev build-essential mongodb-10gen

Create and activate a virtual environment (recommended):

    $ virtualenv picoenv
    $ . picoenv/bin/activate

Install python libraries (Django, MongoEngine):

    $ cd pico-ckan
    $ python setup.py install 
    $ pip install -r requirements.txt

Start up Django:

    $ cd pkan
    $ python manage.py runserver

Load some metadata (works with any CKAN API):

    $ curl http://opendata.cmap.illinois.gov/api/action/package_show?id=4cb2a4e2-8aaa-484d-8a9f-0874e70697fe | python filter_open_json.py | mongoimport -d metadb -c metadata

Install mongo-connector:

    $ pip install mongo-connector

Start up mongo-connector:

    $ python ./mongo_connector.py -m localhost:27017 -t http://localhost:8983/solr -o config.txt -n metadb.metadata -u _id -d ./doc_managers/solr_doc_manager.py

Any data you add to the metadb database and metadata collection will be synced with the search index.

See main README.md for info on adding a data store.

