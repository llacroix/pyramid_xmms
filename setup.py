import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.md')).read()
CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

requires = [
    'gunicorn',    
    'gevent-websocket',
    'xmmsclient',
    'pyramid',
    'pyramid_debugtoolbar',
    'pyramid_rpc',
    'waitress',
    ]

setup(name='xmms',
      version='0.0',
      description='xmms',
      long_description=README + '\n\n' +  CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='',
      author_email='',
      url='',
      keywords='web pyramid pylons',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="xmms",
      entry_points = """\
      [paste.app_factory]
      main = xmms:main
      """,
      )

