#! /bin/sh

cd PetPal

virtualenv venv
source venv/bin/activate

pip3 install django

python3 -m pip install --upgrade pip
python3 -m pip install --upgrade Pillow

pip3 install djangorestframework

pip3 install djangorestframework-simplejwt
