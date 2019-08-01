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


### 3. Home and Searching
| method | routes                        | detail             | body | headers | query |
| ------ | -------------- | ------------------------------- | ---|----|---|
| GET    | /questions/all     |        show all question              | - | token | -|
| GET    | /questions/all     |        show filtering question              | - | token | question or tag or title or popular |

> GET / questions / all ?tag=mongoose

#### expected output
status code: 201

array of object

    [
        {
            "tags":["populate","mongoose"],
            "upvotes":[],
            "downvotes":[],
            "_id":"5d411a96e65621211f84db5c",
            "title":"uji coba populate",
            "description":"bisa gak ya populate ny gini",
            "user_id":{
                "watchedTags":["mongoose","javascript","vue-cli","nodejs"],
                "_id":"5d41093d34ad6815221f9256",
                "username":"tviuty",
                "email":"tviuty@yahoo.com",
                "password":"$2a$10$Dq8SDYTAH6nPE7OMSr/l9.n2VCe8LxK3MvsMlYwrZyJi94fsFU/ye","createdAt":"2019-07-31T03:21:33.919Z",
                "updatedAt":"2019-08-01T10:57:44.550Z","__v":0
            },
            "createdAt":"2019-07-31T04:35:34.265Z",
            "updatedAt":"2019-08-01T04:20:02.350Z","__v":0
        },
        {
            "tags":["mongoose","vue"],
            "upvotes":["5d41093d34ad6815221f9256","5d41098c34ad6815221f9257"],
            "downvotes":[],"_id":"5d4116a68ca6b81ae769f0ea",
            "title":"Uji  Coba Tag Lagi",
            "description":"<b>ini masuk gak ya tag nya? edit nya bisa gak</b>",
            "user_id":{
                "watchedTags":["mongoose","javascript","vue-cli","nodejs"],
                "_id":"5d41093d34ad6815221f9256",
                "username":"tviuty",
                "email":"tviuty@yahoo.com",
                "password":"$2a$10$Dq8SDYTAH6nPE7OMSr/l9.n2VCe8LxK3MvsMlYwrZyJi94fsFU/ye","createdAt":"2019-07-31T03:21:33.919Z","updatedAt":"2019-08-01T10:57:44.550Z","__v":0
            },
            "createdAt":"2019-07-31T04:18:46.991Z",
            "updatedAt":"2019-08-01T04:18:20.091Z","__v":0
        }
    ]


##### need auth

| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| GET    | /questions/myquestion         |    show all question based-on user_id who logged in to system         | - | token | - |
> expected output : code 200, array of object question 

| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| POST    | /questions       |        create new question       |  title,description,user_id, tags | token | - |

> expected output : code 201, object question

        {
            "tags":["populate","mongoose"],
            "upvotes":[],
            "downvotes":[],
            "_id":"5d411a96e65621211f84db5c",
            "title":"uji coba populate",
            "description":"bisa gak ya populate ny gini",
            "user_id":{
                "watchedTags":["mongoose","javascript","vue-cli","nodejs"],
                "_id":"5d41093d34ad6815221f9256",
                "username":"tviuty",
                "email":"tviuty@yahoo.com",
                "password":"$2a$10$Dq8SDYTAH6nPE7OMSr/l9.n2VCe8LxK3MvsMlYwrZyJi94fsFU/ye","createdAt":"2019-07-31T03:21:33.919Z",
                "updatedAt":"2019-08-01T10:57:44.550Z","__v":0
            },
            "createdAt":"2019-07-31T04:35:34.265Z",
            "updatedAt":"2019-08-01T04:20:02.350Z","__v":0
        }

| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| DELETE    | /questions/:questionid            |       delete one question           | - | token | - | 

> expected output : code 200

| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| PUT    | /questions/:questionid        |        edit one question           |  title,description,user_id, tags | token | - |

> expected output : code 200

    {
            "tags":["populate","mongoose"],
            "upvotes":[],
            "downvotes":[],
            "_id":"5d411a96e65621211f84db5c",
            "title":"uji coba populate",
            "description":"bisa gak ya populate ny gini",
            "user_id":{
                "watchedTags":["mongoose","javascript","vue-cli","nodejs"],
                "_id":"5d41093d34ad6815221f9256",
                "username":"tviuty",
                "email":"tviuty@yahoo.com",
                "password":"$2a$10$Dq8SDYTAH6nPE7OMSr/l9.n2VCe8LxK3MvsMlYwrZyJi94fsFU/ye","createdAt":"2019-07-31T03:21:33.919Z",
                "updatedAt":"2019-08-01T10:57:44.550Z","__v":0
            },
            "createdAt":"2019-07-31T04:35:34.265Z",
            "updatedAt":"2019-08-01T04:20:02.350Z","__v":0
    }
| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| PATCH    | /questions/upvotes/:questionid       |           | - | token | - |
> expected output : code 200

| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| PATCH    | /questions/downvotes/:questionid       |            | - | token | - |
> expected output : code 200

### 4. Answer
| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| GET    | /answers                    |        get all answer based on question_id  | - | token | - |                                |
> expected output : code 200, object answers

##### need auth
| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| POST    | /answers                    |        create answer             | - | token | - |
> input: description, user_id, question_id

> expected output : code 201, object answers
 
| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- | 
| PUT    | /answers/:answerid                   |        edit one answer            |- | token | - |
> expected output : code 200

| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| DELETE    | /answers/:answerid                   |        delete one answer            | - | token | - |
> expected output : code 200


| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| PATCH    | /answers/upvotes/:answerid                   |        to upvote one answer           | - | token | - |
> expected output : code 200


| method | routes                        | detail            | body | headers | query |
| ------ | ----------------------------- | ----------------------- | -- | -- | -- |
| PATCH    | /answers/downvotes/:answerid          |        to downvote one answer        | - | token | - |
> expected output : code 200



## Example Expected output validation error if one of req.body empty for all Collection

status code : 400

    {
        "message":"Question validation failed: title: Path `title` is required., description: Path `description` is required."
    }


#### expected output JsonWebTokenError (try to edit or delete document without token)
status code : 401

    {
        "message": "Sorry you are not authorized"
    }
