from mongoengine import *
from pkan.settings import DBNAME, COLLECTIONNAME

connect(DBNAME)

class CkanDataset(Document):
    title = StringField(max_length=150, required=True)
    url = StringField(max_length=1024, required=True)
    notes = StringField(max_length=1024, required=True)
    meta = {'collection': COLLECTIONNAME}
