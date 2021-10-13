# Documentation 
### Introduction
It is the phase 2 of the assignment, most functionailities are presented and implemented, except image support and function testing. Mongodb was well implemented to the project, but the code is mainly focus on local database which means there is no aysnc meathod was used.

### Version Control
In this project, version control was implemented with github. For each major changes to the app, there will be a commit to the local repository. If those functions are tested and 
approved, then they will be pushed. 
*My plan was to first create a simple chat that only shows messages from dierent inputs, since I have done it in pervious workshop, it should be
easy to fulfill. Then I worked on creating and removing groups and channels, also improved the small things in chat like sent message is shown as blue on the right side and 
recevied message is grey and on the left side. 
*Afterward, it will be managing account authcations. I first display the users who are editable for the current admin. Where Super admin has the most power, then group admin and 
lastly assist admin. In this phase, user is not planned to have account features. 
*When users are showing correctly, I started working on adding and removing them to groups or rooms. In this case, I need to figure out what groups they have not been added in and 
should be displayed in available list, etc.

### Data Structures
In my project, there are 5 main data groups, I will show them in a table for better view.

** Auth Table **
|Username | Accessed room/group code | User role|
|----------------|---------------|---------------|
|sadmin| 1,2,3,4,5,6,7,8,9,10,11,12 | sadmin|
|gadmin| 1,2,3,4,5,6,7,8,9,10,11,12 | gadmin|
|aadmin| 1,2,3,4,5,6,7,8,9,10,11,12 | aadmin|
|user1| 1,2,3,4,5,8 | user|
|user2| 1,2,3,5,6,7,8 | user|

** Group Table **
|Group name | ID|
|----------------|---------------|
|Local | 1|
|Apex | 2|
|Hunting | 3|
|Basketball | 4|

** Room Table **
|Parent group | Room name | room code|
|----------------|---------------|----------|
|Local | Animals | 5|
|Local | Plants | 6|
|Apex | aiming | 7|
|Apex | patch notes | 8|
|Hunting | Places | 9|
|Basketball | Players | 10|
|Basketball | Game | 11|
|Basketball | Stream | 12|

** User Table **
|Username | Email | Password | Role|
|-------|-----------|----------|-------|
|sadmin | sadmin@gmail.com | sadminpw | sadmin|
|gadmin | gadmin@gmail.com | gadminpw | gadmin|
|aadmin | aadmin@gmail.com | aadminpw | aadmin|
|user1 | user1@gmail.com | userpw | user|
|user2 | user2@yahoo.com | userpw | user|

### REST API
there are a lot of api file contained in server side. I managed them all into a folder called routes, there are relatively add, remove and update api for groups, rooms and user details. Also, getlist api is used to provide some init data so that pages will preform properly. They will be first called by the client side as a function via service. Where the service for that is _commonservice. This service will call the api function to make changes to the mongodb. 

### Angular Architecture 
There are 3 component for phase 2, which is chat, login and create-account. Where all of them have very specific role of functionaility. Login is the first page that all users 
will navigate to, this component will clear all the user data from pervious login and check for the new user's name and password. Later, if user credential is correct, they can
now access chat page where they can go in to the groups and rooms that they are allowed to. Lastly, create-account component will handle all create, edit and remove usres, as well
as add and remove them into or from groups and rooms. Socket.service is the method to connect server socket.io, where it takes the server URL to regonise the server port and 
manage change room, send message and subsribe channels functions.
