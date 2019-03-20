from bs4 import BeautifulSoup
import re
import urllib2
import pandas as pd
import pandas as np
import numpy as np
import json
from classes import Class

TD_CON = 19
term = "201809" #find this online at the orc timetable

# Referenced code throughout from https://github.com/layuplist/layup-list

#url where we pull info from
TIMETABLE_URL = (
    "http://oracle-www.dartmouth.edu/dart/groucho/timetable.display_courses")

#data to be requested

DATA_TO_SEND = (
"distribradio=alldistribs&depts=no_value&periods=no_value&"
"distribs=no_value&distribs_i=no_value&distribs_wc=no_value&pmode=public&"
"term=&levl=&fys=n&wrt=n&pe=n&review=n&crnl=no_value&classyear=2008&"
"searchtype=Subject+Area%28s%29&termradio=selectterms&terms=no_value&"
"subjectradio=selectsubjects&hoursradio=allhours&sortorder=dept"
"&terms="+term
)

listOfClasses = []

#Create a new soup constructor
def retrieve_soup(url, data=None, preprocess=lambda x: x):
    return BeautifulSoup(
        preprocess(urllib2.urlopen(url, data=data).read()), "html.parser")

request_data = DATA_TO_SEND.format()
soup = retrieve_soup(
    TIMETABLE_URL,
    data=request_data,
    preprocess=lambda x: re.sub("</tr>", "", x),
)

holder = soup.find_all('div', {'class':"data-table"})

table = holder[0].find_all('table')

rows = table[0].find_all('tr')

#This is what we want and where all of the data is stored
cell = rows[0].find_all('td')

#there are 18 cells across each class entry
num_courses = len(cell)/18
for i in range(0, num_courses):
    shift = 18*i
    fix = cell[8+shift].string

    #adress this None type issue that happens only to this one cell for some reason
    if fix is None:
        fix = "NA"
    #Create a new class
    test = Class(cell[shift].string, cell[1+shift].string, cell[2+shift].string[1:], cell[3+shift].string, cell[5+shift].string, cell[7+shift].string, fix, cell[11+shift].string, cell[12+shift].string, cell[13+shift].string, cell[5+shift])
    listOfClasses.append(test.classReturn())

#write everything to the json file
with open("data.json", "wb") as outfile:
    json.dump(listOfClasses, outfile, indent=4)
