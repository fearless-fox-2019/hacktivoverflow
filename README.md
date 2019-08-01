# hacktivoverflow

Feature and Endpoint

### 1. Login
| method | routes                        | detail                              | body | headers | query |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|----|
| POST   | /users/login                    | `User` login to system                    | email, password | - | -|

> POST / users/login
#### input
    {
        "email": "tviuty@yahoo.com",
        "password": "12345",
    }
#### expected output
status code: 200

object

    {
       "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0dml1dHlAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdG5iaU52eHp2Vmpud2cuOUJBYXJiZVBGVU5BaDFzbEZEbFJpODU0a1h4VGxCYzdEeXYvZlMiLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTA4VDA2OjExOjIyLjU5NFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTA4VDA2OjExOjIyLjU5NFoiLCJpYXQiOjE1NjI1NzE2NzIsImV4cCI6MTU2MjU3NTI3Mn0.HF9CmMpJrzSV64fO-T6CH76bJkPCf22td4PddDa-lW8",
        "user": "eyJhbGciOiJIUzI1NiIsInR9"
    }



### 2. Register
| method | routes                        | detail                              | body | headers | query |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|----|
| POST   | /users/register                 | create new `User`                         | email, password,username | - | -|

> POST / users/register
#### input all required
    {
        "email": "tviuty@yahoo.com",
        "password": "123456",
        "username" : "tviuty"
    }

minimum password length : 5

#### expected output
status code: 201

object

    {
        "id": 2,
        "email": "tviuty1206@yahoo.com",
        "password": "$2a$10$hnpJVqap6dJRTIANw8avFOSRe2Uhy43KD2jz5DCd6yIZBYlTUaN9.",
        "username" : "tviuty",
        "updatedAt": "2019-07-08T10:01:21.667Z",
        "createdAt": "2019-07-08T10:01:21.667Z"
    }


### 3. Home
| method | routes                        | detail             | body | headers | query |
| ------ | -------------- | ------------------------------- | ---|----|---|
| GET    | /questions/all     |        show all question              | - | token | -|
> expected output : code 200, array of object question 

#####need auth
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| GET    | /questions/myquestion                    |        show all question based-on user_id who logged in to system                                   |
> expected output : code 200, array of object question 

| POST    | /questions                    |        create new question                                  |
> input: title,description,user_id
> expected output : code 201, object question
 
| DELETE    | /questions/:questionid                    |        delete one question                                 |
> expected output : code 200

| PUT    | /questions/:questionid                    |        edit one question                                 |
> expected output : code 200

| PATCH    | /questions/upvotes/:questionid                   |                                     |
> expected output : code 200
| PATCH    | /questions/downvotes/:questionid                   |                                       |
> expected output : code 200

### 4. Answer
| GET    | /answers                    |        get all answer based on question_id                                  |
> expected output : code 200, object answers

#####need auth

| POST    | /answers                    |        create answer                                  |
> input: description, user_id, question_id

> expected output : code 201, object answers
 
| PUT    | /answers/:answerid                   |        edit one answer                                 |
> expected output : code 200

| DELETE    | /answers/:answerid                   |        delete one answer                                 |
> expected output : code 200

| PATCH    | /answers/upvotes/:answerid                   |        to upvote one answer                                 |
> expected output : code 200

| PATCH    | /answers/downvotes/:answerid                   |        to downvote one answer                                 |
> expected output : code 200