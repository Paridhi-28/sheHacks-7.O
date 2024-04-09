from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

MONGODB_PASS = os.getenv('MONGODB_PASS')

def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://OCMB1:"+ MONGODB_PASS +"@cluster0.e5wloiz.mongodb.net/?retryWrites=true&w=majority"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)

   print(client.drop_database('Toronto_Police_Crime_Report'))
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['Toronto_Police_Crime_Report']
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
   # Get the database
   dbname = get_database()

