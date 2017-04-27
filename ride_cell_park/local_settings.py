from settings import BASE_DIR
import os

SECRET_KEY = '&n-rccwxesxw#vgjdf9eyonz0hn0c=g0jbq5q=@ops&+fvowpw'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

STATIC_URL = '/static/build/development/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static/build/development'),
)

# AWS_STORAGE_BUCKET_NAME='XXX'
# AWS_ACCESS_KEY_ID='XXX'
# AWS_SECRET_ACCESS_KEY='XXX'
# AWS_S3_HOST='s3-us-west-2.amazonaws.com'