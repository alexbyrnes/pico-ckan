#!/usr/bin/env python

from setuptools import setup

setup(
    name='pkan',
    version='0.1',
    description='Pico CKAN',
    author='Alex Byrnes',
    author_email='alexbyrnes@gmail.com',
    url='http://github.com/alexbyrnes/pico-ckan',
    install_requires=['Django>=1.3', 'mongoengine>=0.7.8'],
)
