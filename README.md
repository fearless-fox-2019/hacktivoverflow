# hacktivoverflow

## Getting Started
 * npm install 
 * `nodemon app.js` or `npm run dev` for running in server port
 * `npm run serve` for running in client port
 

list of routes :
```
http://localhost/3000/users
http://localhost/3000/answers
http://localhost/3000/questions

```

### list of `users` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/users | POST| none | firstname:String, lastname:String, birthday: Date, email:String, Password:string (all required)| Create a new user
/users/login | POST | none | email:String, password:String | login user

Success Register : 

```
{
    "data": {
        "_id": "5d42c9b37ff9f8145c56beb6",
        "firstname": "Mikel",
        "lastname": "Gunawan",
        "birthday": "1995-08-15T00:00:00.000Z",
        "email": "mikel1@mail.com",
        "password": "$2a$10$SVj86TcCGky.Nl/MNN2qMOy59adEaGhp3m5jUuAYtUUXu6qk5L3UG",
        "createdAt": "2019-08-01T11:14:59.949Z",
        "updatedAt": "2019-08-01T11:14:59.949Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJjOWIzN2ZmOWY4MTQ1YzU2YmViNiIsImVtYWlsIjoibWlrZWwxQG1haWwuY29tIiwiaWF0IjoxNTY0NjU4MTAwfQ.SSVhpRHlRZKJQD-oLVE0r6bMOkjoyy6DlcPfMmCGfxU"
}

```

register, login directly.

Succes Login :

```
{
    "data": {
        "_id": "5d42c9b37ff9f8145c56beb6",
        "firstname": "Mikel",
        "lastname": "Gunawan",
        "birthday": "1995-08-15T00:00:00.000Z",
        "email": "mikel1@mail.com",
        "password": "$2a$10$SVj86TcCGky.Nl/MNN2qMOy59adEaGhp3m5jUuAYtUUXu6qk5L3UG",
        "createdAt": "2019-08-01T11:14:59.949Z",
        "updatedAt": "2019-08-01T11:14:59.949Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJjOWIzN2ZmOWY4MTQ1YzU2YmViNiIsImVtYWlsIjoibWlrZWwxQG1haWwuY29tIiwiaWF0IjoxNTY0NjU4MTU5fQ.5PHzo_iB_HEngVoYxWXuOmt7xi2U-mXpBkRoUUO83xY"
}


```


### list of `questions` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/questions | POST | token | - | create new question
/questions | GET |  | - | get all questions
/questions/:id | GET | - | - | get detail questions
/questions/:id | DELETE | token | - | delete questions
/questions/upvote/:id | PATCH | token | - | push userId to upvote array
/questions/downvote/:id | PATCH | token | - | push userId to downvote array

### list of `answers` routes

Route | HTTP | Headers(s) | Query | Body | Description
------ | ------ | ------- | ------- | ------- |-----------
/answers | GET | token | yes | - |get answers by question id
/answers | POST | token | - | title:String, description:string |create new question
/answers/:id | GET | token | - | - |get one answers in question
/answers/upvote/:id | PATCH | token | - | - | push userId to upvote array
/answers/downvote/:id | PATCH | token | - | - | push userId to downvote array
/answers/:id | DELETE | token | - | - |delete answers 
