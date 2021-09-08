# Documentation 
### Introduction
Since it is the first phase of the assignment, some of it functionailities are not presentable, for instance that the storage of the application is currently only work on a single 
web and will clear everything when closed. Only the chat message can be transferred by the server and hit different borwser.

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
In my project, there are 4 main data groups, I will show them in a table for better view.
** Auth Table **
Permission lvl | Accessed room/group code | User name
----------------|---------------|---------------
sadmin| 1,2,3,4,5,6,7,8 | sadmin
gadmin| 1,2,3,4,5,6,7,8 | gadmin
aadmin| 1,2,3,4,5,6,7,8 | aadmin
user| 1,2,3,4,5,8 | Billy
user| 1,2,3,5,6,7,8 | Oliver
user| 4,5,6,7,8 | Amy

** Group Table **
Group name | Code
----------------|---------------
National | 1
FPS game | 2
Hunting | 3
Basketball | 4

** Room Table **
Parent name | Room name | room code
----------------|---------------|----------
National | Animals | 5
National | Plants | 6
FPS game | aiming | 7
FPS game | patch notes | 8
Hunting | Places | 9
Basketball | Players | 10

** User Table **
Name | Email | Password | Permission lvl
-------|-----------|----------|-------
sadmin | sadmin@gmail.com | sadmin | sadmin
gadmin | gadmin@gmail.com | gadmin | gadmin
aadmin | aadmin@gmail.com | aadmin | aadmin
Billy | Billy@gmail.com | pwbilly | user
Oliver | Oliver@gmail.com | pwoliver | user
Amy | Amy@gmail.com | pwamy | user

### REST API
The 2 files contains server side and client side. They both should be run then the application will excute properly. app-routing.module.ts is the main file that process the
routing between angular pages, where I have import all components in the file and asign them with a specifi name so that I naviagte correctly from other components. Since there is 
only socket.io is implemented at this stage, the purpose of server side is not significant yet, but as soon as I put MongoDB in the server, all data and changes will be processed 
on the server side in stead of storing in sessionstorage.

### Angular Architecture 
There are 3 component for phase 1, which is chat, login and create-account. Where all of them have very specific role of functionaility. Login is the first page that all users 
will navigate to, this component will clear all the user data from pervious login and check for the new user's name and password. Later, if user credential is correct, they can
now access chat page where they can go in to the groups and rooms that they are allowed to. Lastly, create-account component will handle all create, edit and remove usres, as well
as add and remove them into or from groups and rooms. Socket.service is the method to connect server socket.io, where it takes the server URL to regonise the server port and 
manage change room, send message and subsribe channels functions.
