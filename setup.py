from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in gym_app/__init__.py
from gym_app import __version__ as version

setup(
	name="gym_app",
	version=version,
	description="This is gym management system that will help me learn all the necessarry skills to develope frappe work",
	author="Paul Kimotho",
	author_email="paulkimotho2@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
