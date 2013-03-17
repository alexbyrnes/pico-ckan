pico-ckan
===================

A micro open data hub built on [Unix design principles](http://en.wikipedia.org/wiki/Unix_philosophy).

[Screenshot](https://github.com/alexbyrnes/pico-ckan/blob/master/screenshot_markup.md) / [Video](http://www.youtube.com/watch?v=1VL7y9VS5uw)

## Quick Install (Solr + Any web page)

*Scroll to the end of this file for a full bash transcript*

Download/Extract Solr:

    $ curl http://apache.mesi.com.ar/lucene/solr/4.2.0/solr-4.2.0.tgz | tar xz

*(Please replace with another [solr mirror](http://www.apache.org/dyn/closer.cgi/lucene/solr/4.2.0))*

Copy schema to Solr:

    $ cp pico-ckan/schema.xml solr-4.2.0/example/solr/collection1/conf/

Start Solr server:

    $ cd solr-4.2.0/example/
    $ java -jar start.jar &

Add sample dataset:

    $ curl 'http://localhost:8983/solr/update/json?commit=true' --data-binary @pico-ckan/sample.json -H 'Content-type:application/json'

Test:

    $ curl http://localhost:8983/solr/collection1/select?q=*:*

Download this repository and open [example.html](https://github.com/alexbyrnes/pico-ckan/blob/master/example.html) in your favorite browser.  (Assumes Solr install at localhost.)


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

*The [full install](https://github.com/alexbyrnes/pico-ckan/blob/master/README_FULL.md) uses Django/MongoEngine to edit datasets, and mongo-connector to sync MongoDB and Solr.  Use this route if you want flexibility transforming datasets, and a formal Create, Update, and Delete interface.*


## Additional features:

### Datastore

Pico-ckan, like [CKAN] (http://www.ckan.org) deals with metadata and leaves the choice of datastores open.  

* [OpenDataStack] (https://github.com/alexbyrnes/OpenDataStack): Easy to populate and deploy
* [CartoDB] (https://github.com/CartoDB/cartodb20): Interactive maps, other Geo functions
* [DataBeam] (https://github.com/philipashlock/DataBeam): Add an API to any CSV


## Transcript of install from bare Ubuntu 12.04 Vagrant Box ([Download](http://cloud-images.ubuntu.com/precise/current/precise-server-cloudimg-vagrant-amd64-disk1.box))

```

sudo apt-get update
curl http://apache.mesi.com.ar/lucene/solr/4.2.0/solr-4.2.0.tgz | tar xz
sudo apt-get install git openjdk-6-jre
git clone https://github.com/alexbyrnes/pico-ckan.git
cp pico-ckan/schema.xml solr-4.2.0/example/solr/collection1/conf/
cd solr-4.2.0/example/
java -jar start.jar &
cd -
curl 'http://localhost:8983/solr/update/json?commit=true' --data-binary @pico-ckan/sample.json -H 'Content-type:application/json'
curl http://localhost:8983/solr/collection1/select?q=*:*

# If you want to change the solrUrl (default is localhost):
vim pico-ckan/pkan/pkanapp/static/js/ajax-solr/ckan-ajax-solr.js

```

Don't forget to forward port 8983 from Vagrant.  Add this line to .vagrant.d\boxes\<Your Box>\Vagrantfile :

    config.vm.forward_port 8983, 8983    
