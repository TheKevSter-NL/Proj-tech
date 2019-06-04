# Project tech dating app | Studydate

This is a dating app created for students that want to meet new people that are also students. With the app you can make a account, login to your account and edit your account. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


## Prerequisites
```
Install git
Code editor 
node v11.14.0
npm 6.7.0
A MongoDB Installation (local, cloud or server)

```

## Made with
De app is build with de nodejs express Framework and the EJS page generator 


## Installing 
To install this project make first a folder were you want to install it. Then copy the "HTTPS clone URL" link by clicking the clipboard icon. 
Use the git clone command and paste the link form your clipboard, You can also copy the command below
```
git clone https://github.com/TheKevSter35/Proj-tech.git
```

navigatie into the repository and install the dependencies form package.json file that are used for this app. Use the comment below to install al of them.
```
npm install
```
To make sure that the master-branch is up-to-date, use the pull command 

```
git pull https://github.com/TheKevSter35/Proj-tech.git master
```

In mongoDB create a db and a collection and change that in de server file te connect with your mongoDB

```
var db = mongojs('NAME-OF-YOUR-DATABASE', ['NAME-OF-YOUR-COLLECTION']);
```
To start the server typ 
```
node server.js
```
then go to your browser and go to your hostname and port number to see the app. for Example
```
http://localhost:5000
```



## Testen
Na de installatie stappen kan de dating website getest worden.

## Style sheets
The CSS of all the pages are in one CSS file. All coding for each pages are separated from each other in the CSS file. 



## Auteur
TheKevSter35 | TECH 4

##license

This project is licensed under the MIT License