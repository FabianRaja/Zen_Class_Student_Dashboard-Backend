# Zen Class Student Dashboard - Backend

[Live Server](https://zenportal.onrender.com/)

## Demo Account : 

* Email : demo@gmail.com
* Password : Demo@123

## Packages : 

* cors
* dotenv
* express
* mongoose
* nodemon
* bcrypt
* jsonwebtoken
* nodemailer

## Features : 

### Users:

* /add - to register user
* /login - to login user
* /forgot - to send reset password link to mail
* /reset - to reset password
* /portfolio - to submit portfolio
* /capstone - to submit capstone
* /leave - to submit leave application
* /testimonial - to submit testimonial
* /query - to submit query
* /task - to submit task

### Class:

* /addClass - to add class data's
* /getClass - to get class data's
* /addRequirements - to add requirements data's
* /getRequirements - to get requirements data's
* /addPlacement - to add placement data's
* /getPlacement - to get placement data's

## Steps:

### /add :

* creating salt value using bcrypt
* adding salt and hash values as password using bcrypt
* creating a data object to create user
* adding new user obj to the database
* creating a modified obj for history database
* adding user to the history database as well

### /login :

* finding user using email
* if there is a not user with this email it will return as user not registered else continue
* comparing and validating password using bcrypt
* if the password is not matching it will send invalid password as response
* if the password is matching it will create a token using generateToken by importing from jsonwebtoken

### /forgot :

* find user with email
* if there is no user it will send response as user not registered
* if the user email is founded it will send a link with id as params
* composing mail to send
* transport is imported from nodemailer to send mail

### /reset :

* finding user with id from params
* creating salt value using bcrypt
* creating hash values and adding salt value to create a password
* updating password in the database to a particular user

### /portfolio :

* is authorized using jsonwebtoken
* finding user and updating the portfolio

### /capstone :

* is authorized using jsonwebtoken
* finding user and updating the capstone

### /leave :

* is authorized using jsonwebtoken
* finding user and updating leave application
* adding the data's in the history
* finding user in the history collection in the database
* finding user and updating the leaves application in the history collection

### /testimonial :

* is authorized using jsonwebtoken
* to find user and update the testimonial
* finding user in the history collection in the database
* finding user and updating the testimonial in the history collection

### /query :

* is authorized using jsonwebtoken
* to find user and update the query
* finding user in the history collection in the database
* finding user and updating the query in the history collection

### /task :

* is authorized using jsonwebtoken
* to find user and update the task
* finding user in the history collection in the database
* finding user and updating the task in the history collection

### /addClass :

* adding class data's in the database

### /getClass : 

* to find the class data in the database

### /addRequirements : 

* adding requirements data's in the database

### /getRequirements : 

* to find the requirements data in the database

### /addPlacement :

* adding placements data's in the database

### /getPlacement :

* to find the placements data in the database
