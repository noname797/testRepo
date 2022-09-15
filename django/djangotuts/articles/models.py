from django.db import models

# Create your models here.
# Models in python are a class which represents a table in a database
# Each type of data we  have is represented by it's own models
# Eaach model maps to a single table in a database.

# A model is represented by class in django

class Article(models.Model):
    title = models.CharField(max_length=100)

    slug = models.SlugField()

    body = models.TextField()

    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title # Setting the string version to that particular information
        # Article.objects.all()[0] # fetch all the titles



    # Add in thumbnail urlpatterns
    # Add in author later
    # Check on different field types

    # This model is mapped to db through mighration

    # First run manage.py migrate

    # To migrate own file/To update files in the models
    #python manage.py makemigrationss

    # To make migration files
    #Python manage.py makemigrationss

# ORM bridges the gap between code and the db. buildin in the model
# To create an interactive shell to check with db.
    # python manage.py shell

    #
    # from articles.models import article
    # Article #Database
    # article = Article() # Creatingan instance of db
    # article.title = "hellow" # setting the attribute
    # article.save() # Save it to the db
    #
    # Article.objects # Gives all the information that was retrieved
    # Article.objects.all()[0] # indexing the first element
    # Article.objects.all()[0].title # fetching title

    # # article2 = Article() # Creatingan instance of db
    # article2.title = "welloh" # setting the attribute
    # article2.save() # Save it to the db
