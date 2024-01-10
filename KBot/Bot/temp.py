import sqlite3

conn=sqlite3.connect('KBOT_RESPONSE')
c=conn.cursor()

# c.execute("Delete from kbot_data")
# conn.commit()

#c.execute("create table kbot_data(uqn text,uans text) ")
# uqn='What you do'
# uans='Answering your qns '
# c.execute("insert into kbot_data values(?,?)",(uqn,uans))
# conn.commit()
c.execute("select * from kbot_data")
all_rows=c.fetchall()
uqn_li=[]
uans_li=[]
for qn,ans in all_rows:
    uqn_li.append(qn)
    uans_li.append(ans)
print(uqn_li)
print(uans_li)
