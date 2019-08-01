# hacktivoverflow 🎡🐼🌲



## basic routes 
`baseUrl` :

```
http://localhost:3000
```

### User

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /users | GET | none | none | get all users |
| /users | POST | none | username:STRING, email:STRING(valid email), password:STRING | register user |
| /users/login | POST | none | email:STRING, password:STRING | user login |
| /users | PATCH | token | sesuai yg diupdate apa | update profile/ my user |

### Question

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /questions | GET | none | none | get all |
| /questions/:id | GET | none | none | get question by id question|
| /questions | POST | token | title:STRING, description:STRING | create a question |
| /questions/:id | PACTHH | token | status: upvote or downvote | votes a question|
| /questions/:id | DELETE | token | none | delete a question |
| /questions/user/:userid | GET | token | none | get question by UserId |
| /questions/update/:id | PATCH | token | title:STRING, description:STRING | update or edit a question |

### Answer
| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /answers | GET | none | none | get all answer |
| /answers/question/:id | GET | none | none | get all answer with question id |
| /answers/:questionid | POST | token | title:STRING, description:STRING | create an answer |
| /answers/:id | PATCH | token | title:STRING, description:STRING | update an answer |
| /answers/answervote/:id | POST | token | status: upvote or downvote | vote an answer |