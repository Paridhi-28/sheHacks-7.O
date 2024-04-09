import locationtagger
import nltk
from pymongo import MongoClient
from getpass import getpass
from time import sleep
from datetime import datetime, timedelta
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium import webdriver
from geopy.extra.rate_limiter import RateLimiter
from geopy.geocoders import Nominatim
import os
# from collections import Counter
from dotenv import load_dotenv
load_dotenv()

from selenium.webdriver.chrome.service import Service as ChromeService

from webdriver_manager.chrome import ChromeDriverManager

import certifi; 


# essential entity models downloads
nltk.downloader.download('maxent_ne_chunker')
nltk.downloader.download('words')
nltk.downloader.download('treebank')
nltk.downloader.download('maxent_treebank_pos_tagger')
nltk.downloader.download('punkt')
nltk.download('averaged_perceptron_tagger')


# essential entity models downloads
nltk.downloader.download('maxent_ne_chunker')
nltk.downloader.download('words')
nltk.downloader.download('treebank')
nltk.downloader.download('maxent_treebank_pos_tagger')
nltk.downloader.download('punkt')
nltk.download('averaged_perceptron_tagger')


def getTweetData(tweet):
    try:
        tweetTime = tweet.find_element(
            By.XPATH, ".//time").get_attribute('datetime')
    except NoSuchElementException:
        return
    try:
        # This only gets one image, what if there are more?
        tweetImage = tweet.find_element(
            By.XPATH, ".//div[1]/div[1]//div[2]/div[2]//img").get_attribute("src")
    except NoSuchElementException:
        # print("no image")
        tweetImage = "No Image"
    tweetText = tweet.find_element(
        By.XPATH, ".//div[1]/div[1]/div[2]/div[2]/div[2]").text

    tweetInfo = [tweetText, tweetTime, tweetImage]
    return tweetInfo


def ScraperMain():
    twitterUsername = os.getenv('TW_USERNAME')
    twitterPassword = os.getenv('TW_PASSWORD')

    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

    # driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get('https://www.twitter.com/login')
    sleep(3)
    # Finding and inputing username
    username = driver.find_element(
        By.XPATH, "//body/div[@id='react-root']/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[5]/label[1]/div[1]/div[2]/div[1]/input[1]")
    username.send_keys(twitterUsername)
    username.send_keys(Keys.RETURN)
    sleep(1)
    # Finding and inputing Password
    # mypassword = getpass()
    password = driver.find_element(
        By.XPATH, "//body/div[@id='react-root']/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/label[1]/div[1]/div[2]/div[1]/input[1]")
    password.send_keys(twitterPassword)
    password.send_keys(Keys.RETURN)
    sleep(5)

    # Selecting and searching required police section
    search = driver.find_element(
        By.XPATH, "//body/div[@id='react-root']/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/form[1]/div[1]/div[1]/div[1]/div[1]/label[1]/div[2]/div[1]/input[1]")
    search.send_keys('@TPSOperations')
    search.send_keys(Keys.RETURN)
    sleep(2)

    # Click required page
    SearchQuery = driver.find_element(
        By.XPATH, "//span[contains(text(),'Toronto Police Operations')]")
    SearchQuery.click()

    # Storing Tweet data in list
    tweetData = []
    tweetIds = set()
    lastPos = driver.execute_script("return window.pageYOffset;")
    scrolling = True
    maxDate = False
    stopDate = str((datetime.today() - timedelta(days=30)).strftime('%Y-%m-%d'))

    while (scrolling and not (maxDate)):
        # Find Tweets
        TPOPageTweets = driver.find_elements(
            By.XPATH, '//article[@data-testid="tweet"]')
        sleep(1)
        for tweet in TPOPageTweets[-100:]:
            currentTweetInfo = getTweetData(tweet)
            if currentTweetInfo:
                tweetId = "".join(currentTweetInfo)
                if tweet not in tweetIds and currentTweetInfo[0] != '' and ":" in currentTweetInfo[0] and 'Good night' not in currentTweetInfo[0] and 'Good afternoon' not in currentTweetInfo[0] and 'Good morning' not in currentTweetInfo[0] and 'Good Night' not in currentTweetInfo[0]:
                    tweetIds.add(tweet)
                    currentTweetInfo.append(tweetId)
                    tweetData.append(currentTweetInfo)
                    if stopDate in currentTweetInfo[1]:
                        maxDate = True
                        break

        scrollAttempt = 0
        while True:
            driver.execute_script('window.scrollBy(0,3000);')
            sleep(2)
            currPos = driver.execute_script("return window.pageYOffset;")
            if maxDate:
                break
            if lastPos == currPos:
                scrollAttempt += 1
                if scrollAttempt >= 3:
                    scrolling = False
                    break
                else:
                    sleep(2)
            else:
                lastPos = currPos
                break
    print("Tweets Scraped")
    return tweetData


def sortData(scrapedTweet):
    # List: catagory (Missing...), Status(Update, Located)
    computedData = []
    counter = 0
    for i in range(len(scrapedTweet)):
        dataObject = {}
        if (scrapedTweet[i][0].find('\n') != -1):
            # Getting Status:
            dataObject["Status"] = scrapedTweet[i][0].splitlines()[0].split(":")[0]
            # Getting Updates (?LOCATED)...
            try:
                dataObject["Updates"] = scrapedTweet[i][0].splitlines()[0].split(":")[1]
            except IndexError:
                dataObject["Updates"] = ""
            # currentLocation could be the currentIdentity
            currentLocation = scrapedTweet[i][0].splitlines()[1].split(", ")
            # Checking whether we have a Location or an identity
            if any(char.isdigit() for char in currentLocation):
                dataObject["Name"] = currentLocation[0]
                if currentLocation[1].isnumeric():
                    dataObject["Age"] = currentLocation[1]
                else:
                    dataObject["Age"] = ""
                description = scrapedTweet[i][0].splitlines()
                del description[0:2]
                #Extracting Location from Description
                lists = scrapedTweet[i][0].splitlines()
                del lists[0:2]
                try:
                    partOfDescription = lists[0] + " " + lists[1]
                except IndexError:
                    partOfDescription = scrapedTweet[i][0]                   
                dataObject["Location"] = locationtagger.find_locations(text = partOfDescription).other
            else:
                try:
                    dataObject["Location"] = scrapedTweet[i][0].splitlines()[1]
                except IndexError:
                    dataObject["Location"] = ""
                description = scrapedTweet[i][0].splitlines()
                del description[0:1]
            if dataObject["Location"] is not None:
                locationcheck = dataObject["Location"]
                if type(dataObject["Location"]) == list and bool(dataObject["Location"]):
                    res = max(locationcheck, key = len)
                    locationcheck = res
                if "and" in locationcheck:
                    locationcheck = locationcheck.replace("and", "")
                if "&" in locationcheck:
                    locationcheck = locationcheck.replace("&", "")
                geolocator = Nominatim(user_agent="Twitter_Scraper")
                geocode = lambda query: geolocator.geocode("%s, Toronto ON" % query)
                geocode2 = RateLimiter(geocode, min_delay_seconds=0.001)
                sleep(1)
                locationcor = geocode2(locationcheck)
                if locationcor is not None:
                    locationcor2 = [locationcor.latitude, locationcor.longitude]
                    dataObject["LocationGoeCode"] = locationcor2
                else:
                    dataObject["LocationGoeCode"] = []
                    
            else:
                dataObject["LocationGoeCode"] = ["No Location Provided"]
            dataObject["TweetedTime"] = scrapedTweet[i][1]
            dataObject["ImageUrl"] = scrapedTweet[i][2]
            dataObject["Description"] = description
            computedData.append(dataObject)
            counter = counter + 1
            print(counter)
            print(dataObject['Location'])
            print(dataObject['LocationGoeCode'])
        else:
            print("Tweet Skipped: ", scrapedTweet[i])
    print("Tweets Sorted")
    return(computedData)
        



def addToDB(computedData): 
    # Get the database using the method we defined in pymongo_test_insert file
    # from pymongo_get_database import get_database
    MONGODB_PASS = os.getenv('MONGODB_PASS')

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://OCMB1:"+ MONGODB_PASS +"@cluster0.e5wloiz.mongodb.net/?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # print(client.drop_database('Toronto_Police_Crime_Report'))
    # Create the database for our example (we will use the same database throughout the tutorial
    if 'Toronto_Police_Crime_Report' in client.list_database_names():
        client.drop_database('Toronto_Police_Crime_Report')

    db = client['Toronto_Police_Crime_Report']
    collection_name = db["tweetsData"]
    res = collection_name.insert_many(computedData)
    print("Added To DataBase")
    print("Completed")

print("Scraping Initiated")
tweets = ScraperMain()
sortedData = sortData(tweets)
addToDB(sortedData)