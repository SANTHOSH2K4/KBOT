from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
import sqlite3

def insert_user_data(name, contact, email, school, cutoff):
    connection = sqlite3.connect('newadmissions.db')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO userdata (name, contact, email, school, cutoff) VALUES (?, ?, ?, ?, ?)",
                   (name, contact, email, school, cutoff))
    connection.commit()
    cursor.close()
    connection.close()


with open('prequery', 'rb') as d:
    li = pickle.load(d)

predefined_queries = li

flag_li=[0]
name_flag=[0]
contact_flag=[0]
email_flag=[0]
school_flag=[0]
cutoff_flag=[0]

user_data={}
def query_similarity(query1, query2):
    words1 = set(query1.lower().split())
    words2 = set(query2.lower().split())
    overlap = len(words1.intersection(words2))
    return overlap


def suggest_queries(user_query, predefined_queries):
    suggested_queries = []
    for query in predefined_queries:
        relevance = query_similarity(user_query, query)
        suggested_queries.append((query, relevance))

    suggested_queries.sort(key=lambda x: x[1], reverse=True)

    top_suggestions = [query for query, relevance in suggested_queries[:2]]

    return top_suggestions



def get_suggested_queries(user_input):
    suggested_queries = suggest_queries(user_input, predefined_queries)
    return suggested_queries

resp={}
model_filename = "intent_classifier1.pkl"
with open(model_filename, 'rb') as model_file:
    loaded_model = pickle.load(model_file)

# Create your views here.
def bot(request):
    return render(request,'index.html')

@csrf_exempt  # Use this decorator if you want to disable CSRF protection (for testing purposes)
def send(request):
    if request.method == 'POST':
        # Parse the JSON data sent by the client
        import json
        data = json.loads(request.body)
        u = data.get('message')
        print("Printing....")
        print(u)
        predicted_response = loaded_model.predict([u])
        print(predicted_response)
        c = predicted_response[0]
        
        print(c)
        c1, c2 = c.split('|', 1)

        # Remove leading and trailing whitespace from c1 and c2
        c1 = c1.strip()
        c2 = c2.strip()
        

        # Assuming you have defined 'resp' somewhere in your code
        resp[u] = c1

        
        suggested_queries = get_suggested_queries(u)
        sug=[]
        if suggested_queries:
            for i, query in enumerate(suggested_queries, start=1):
                sug.append((i, query))  
        else:
            print('Bot: No relevant suggestions found.')

        sugg1=sug[0]
        sugg2=sug[1]
        print("SUGGESTIONS BY DJANGO FROM JS ARE : ")
        print(sugg1)
        print(sugg2)
        if("admission" in u):
            flag_li[0]=1
            c1+=" \nDo you want call assistance from our officials?"
            sugg1="Yes"
            sugg2="No"
            
        if flag_li[0] == 1:
            if "no" in u.lower():
                flag_li[0] = 0
            elif "yes" in u.lower():
                c1 = "Enter your name"
                sugg1 = ""
                sugg2 = ""
                name_flag[0]=1
                return JsonResponse({'user_input': u, 'bot_response': c1,'sugg1':sugg1,'sugg2':sugg2,'img':c2})

        if(name_flag[0]==1):
            user_data["name"]=u
            name_flag[0]=0
            c1="Enter your Contact number"
            contact_flag[0]=1
            sugg1=""
            sugg2=""
            return JsonResponse({'user_input': u, 'bot_response': c1,'sugg1':sugg1,'sugg2':sugg2,'img':c2})
            
        if(contact_flag[0]==1):
            user_data["contact"]=u
            contact_flag[0]=0
            c1="Enter your Email address"
            email_flag[0]=1
            sugg1=""
            sugg2=""
            return JsonResponse({'user_input': u, 'bot_response': c1,'sugg1':sugg1,'sugg2':sugg2,'img':c2})
        
        if(email_flag[0]==1):
            user_data["email"]=u
            email_flag[0]=0
            c1="Enter Name of the School Studied"
            school_flag[0]=1
            sugg1=""
            sugg2=""
            return JsonResponse({'user_input': u, 'bot_response': c1,'sugg1':sugg1,'sugg2':sugg2,'img':c2})

        if(school_flag[0]==1):
            user_data["school"]=u
            school_flag[0]=0
            c1="Enter Your 12th cut-off marks "
            cutoff_flag[0]=1
            sugg1=""
            sugg2=""
            return JsonResponse({'user_input': u, 'bot_response': c1,'sugg1':sugg1,'sugg2':sugg2,'img':c2})

        if(cutoff_flag[0]==1):
            user_data["cutoff"]=u
            cutoff_flag[0]=0

        if("name" in user_data.keys() and "contact" in user_data.keys() and "email" in user_data.keys() and "school" in user_data.keys() and "cutoff" in user_data.keys() and flag_li[0]==1):

            c1=f"Check your data here,Name : {user_data['name']},contact : {user_data['contact']},email : {user_data['email']},school studied : {user_data['school']},cut-off  : {user_data['cutoff']},our officials will call you in short."
            flag_li[0]=0
            sugg1=""
            sugg2=""
            print(user_data.values())
            insert_user_data(user_data["name"], user_data['contact'], user_data['email'], user_data['school'],user_data['cutoff'])
            user_data.clear()


        # Return a JSON response
        return JsonResponse({'user_input': u, 'bot_response': c1,'sugg1':sugg1,'sugg2':sugg2,'img':c2})
