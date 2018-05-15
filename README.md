# Building the project

This is a very rough protoype so please excuse the code! 

1. Do an 'npm install' in the root
2. 'ng serve' to run the application
3. Visit http://localhost:4200/#/login


# User ids to test with

15, 15, 17, 18, 19, 20

Login by entering an ID into the temporary sign in box

![alt text](https://preview.ibb.co/hsM5GJ/Screen_Shot_2018_05_14_at_23_46_32.png)



Each user can join a competition once, and there are 20 competitions to test with. Visit http://localhost:4200/#/competitions to see the competitions.

# Joining a competition

![alt text](https://preview.ibb.co/h2cebJ/Screen_Shot_2018_05_14_at_23_28_58.png)

Joining a competition is simple. Just click on the 'join' button in the competition page and in the network tabs of the dev tool, you will see a call to  http://www.refresh-dev.com/api/competitions/101/join with a status code of 201. In the top nav bar, there is a notifications icon (bell). When a user joins a competition, a notification bubble should appear telling the user how many new notifications they have. This notification is a message from a websocket.

![alt text](https://preview.ibb.co/e2qbOy/Screen_Shot_2018_05_14_at_23_35_48.png)


# The problem

The problem was highlighted in this post on SO https://stackoverflow.com/questions/50200780/getting-error-at-websocket-socket-onclose-with-websockets-rx-js-and-angular-5

When the application is served, and when a user joins a competition, the notifican bubble does not appear, and there is a console error. 

![alt text](https://image.ibb.co/bU3wOy/Screen_Shot_2018_05_14_at_23_35_17.png)

But if you refresh the browser, and join a different competition, you will see that the notification bubble appears, and the console error message is gone.

We are using this 3rd part plugin https://github.com/ohjames/rxjs-websockets
But we are happy to pull it out and use plain JS. We cant use socket.io, as it appears it would need to be installed on the server. But we dont need it as we are supporting modern browsers only (ie edge etc)

#Notifications data structure

On page load, there is an api call to get the notifications for the drop down - these are deemed as read and do not display the red notification bubble. 

When a notifications message is sent by the WS server, its in the same format.

https://gist.github.com/fogofogo/97d89bce8af43237a70e0c7e99e5abe5
