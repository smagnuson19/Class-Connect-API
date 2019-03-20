from bs4 import BeautifulSoup
import re
import urllib2
class Class:
    # Constructor
    def __init__(self, term,crn,subj,num, course, xlist,period,instructor, wc, distrib, descripLink):
        # Instance variables - encoding them and removing weird substrings
        # pulled from https://stackoverflow.com/questions/10993612/python-removing-xa0-from-string
        self.term = term.replace(u'\xa0', ' ').encode('utf-8')
        self.crn = crn.replace(u'\xa0', ' ').encode('utf-8')
        self.subj = subj.replace(u'\xa0', ' ').encode('utf-8')
        self.num = num.replace(u'\xa0', ' ').encode('utf-8')
        self.course = course.replace(u'\xa0', ' ').encode('utf-8')
        self.xlist = xlist.replace(u'\xa0', ' ').encode('utf-8')
        self.period = period.replace(u'\xa0', ' ').encode('utf-8')
        self.instructor = instructor.replace(u'\xa0', ' ').encode('utf-8')
        self.wc = wc.replace(u'\xa0', ' ').encode('utf-8')
        self.distrib = distrib.replace(u'\xa0', ' ').encode('utf-8')
        self.descriptLink = descripLink

    def retriveDescription(self):
        link = self.descriptLink.a.get('href')
        #pulling out the url
        link = link[26:]
        link = link.split("\'", 1)[0].rstrip()
        link = re.sub(r'&amp;', r'&', link)
        
        #weird cases where a lot of descriptions on one page
        if 'numb=' not in link:
            link = 'Please see' + link + 'for more info'
        else:
            #go through the url and retrive description of the course 
            soup = BeautifulSoup(urllib2.urlopen(link).read(), "html.parser")
            text = soup.find_all("p", limit=2)
            strn = 'No course description was given'
            #check if there is a course description/ if the description has any messed up tags and items in it
            if (len(text) == 2 and text[1].string != None):
                strn = text[1].string.replace(u'\xa0', ' ').encode('utf-8')
            link = strn
        return link


    def classReturn(self):
        #create a new dictionary item to be inserted into the class array
        dict = {}
        dict["crn"] = self.crn
        dict["crosslisted"] = self.xlist
        dict["instructor"] = self.instructor
        dict["term"] = self.term
        dict["period"] = self.period
        dict["title"] = self.course
        dict["number"] = self.num
        dict["program"] = self.subj
        dict["world_culture"] = self.wc
        dict["distribs"] = self.distrib
        dict["description"] = self.retriveDescription()
        return dict