# Project tech dating app | Studydate

This is a dating app created for students that want to meet new people that are also students. 

![df5d3c250d5108d9544ca2400799eb0e](https://user-images.githubusercontent.com/43183768/58423702-05119980-8096-11e9-905e-ad9eee51e1d4.jpg)

With the app you can make a account, login to your account and edit your account for example a new Bio or a new profile picture. 


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites
What you need to install this project
```
Install git
Code editor 
node v11.14.0
npm 6.7.0
A MongoDB Installation (local, cloud or server)

```

## Build with
The app is build with de nodejs express Framework and the EJS page generator to generate pages it also works with HTML.  


## Installation  
To install this project make first a folder were you want to install it. Then copy the "HTTPS clone URL" link by clicking the clipboard icon. 
Use the git clone command and paste the link form your clipboard, You can also copy the command below
```
git clone https://github.com/TheKevSter35/Proj-tech.git
```

navigate into the repository and install the dependencies for package.json file that are used for this app. Use the comment below to install al of them.
```
npm install
```
dependencies that are used are:
```
    "bcrypt": "^3.0.6",
    "body-parser": "^1.19.0",
    "boilerplate": "^0.6.1",
    "concat-stream": "^2.0.0",
    "dotenv": "^8.0.0",
    "ejs": "^2.6.1",
    "express": "^4.17.1",
    "express-session": "^1.16.1",
    "handlebars": "^4.1.2",
    "mongodb": "^3.2.6",
    "mongojs": "^2.6.0",
    "mongoose": "^5.5.11",
    "multer": "^1.4.1",
    "passport-npm": "^2.0.0"
```
Fot deployment i used ''Heroku''. But there are also other options for deployment this app.

To make sure that the master-branch is up-to-date, use the pull command 

```
git pull https://github.com/TheKevSter35/Proj-tech.git master
```

In mongoDB create a db and a collection and change that in de server file te connect with your mongoDB

```
var db = mongojs('NAME-OF-YOUR-DATABASE', ['NAME-OF-YOUR-COLLECTION']);
```
Collection Records 
<img width="689" alt="20e6a6c7611c4983ff8b34dee3d9eb87" src="https://user-images.githubusercontent.com/43183768/58897992-e34d8d80-86f9-11e9-8038-323b562c9fb7.png">


To start the server  
```
node server.js
```
then go to your browser and go to your hostname and port number to see the app. for Example
```
http://localhost:5000
```
If you see a start screen then you are set 

![18944683edcba87607fe287a9b40d5e2](https://user-images.githubusercontent.com/43183768/58903902-c4a1c380-8706-11e9-83ca-61ecb8906d18.jpg)



## Style sheets
The CSS of all the pages are in one CSS file. All coding for each pages are separated from each other in the CSS file. 

## Auteur
TheKevSter35 | TECH 4

## license
This project is licensed under the MIT License

## Acknowledgments

* Google
* Github
* Stack overflow
* Youtube 
* Lectures/labs from school
* Classmates that helped me

