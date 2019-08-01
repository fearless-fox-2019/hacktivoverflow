# INSTROMFLOW API
Welcome to INSTROMFLOW Api, where you can post a question and get answered by millions of person all around the world!

## Endpoint
# REST
Base url : http://localhost:3000/api
###
Sample Request

    {
	    "users": http://localhost:3000/api/users,
	    "questions": http://localhost:3000/api/questions,
	    "answers": http://localhost:3000/api/answers
    }

There are three available resources:

 - User: used to Login or Register to your account
 - Quetions: CRUD questions(you can ask questions about anything at our website)
 - Answers: CRU Answers(questions will have answers!)

#### User Routes


| Routes| Method | Request Body | Response Data| Response Error | Description |
|----------------------|--------|-----------------------------|-----------------------------------|--|---------------------------------------------------------------|
| `/users/register`| POST | `{ username, email, password }` | `{ access_token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br>  (`${username}` has been registered!)|Register a new user|
| `/users/login` | POST | `{ email, password }`| `{ name, access_token }`| 400 (Wrong email/password) |Log in and get an email verification!|


####  Questions Routes 

##CREATE, UPDATE AND DELETE PROCESS REQUIRE AUTHENTICATION!
### CRUD Routing for questions
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/questions/allquestions`| GET | -| `{ data }`| 500 (Internal Server Error) | 
| `/questions/:id` | GET | - | `${questionDetail}` | 500(internal server error) |
| `/questions/highestVote` | GET | - | `${highestVotePost}` | 500(internal server error) |
| `/questions/:id` | PATCH | `{title,content} AUTHORIZATION REQUIRED`| `{ dataUpdated }`| 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) |Updated a question|
| `/questions/`| POST | `{title,content}`  | `{questionCreated}`| 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Successfully created a new Question! |
| `/questions/:id` | DELETE| `AUTHORIZATION REQUIRED` | `deleted`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Deleted a question|
| `/questions/upVote/:id` | PATCH |  | `upvoted`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | upVoted a question|
| `/questions/downVote/:id` | PATCH |  | `downvoted`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | downVoted a question|


####  Answer Routes 

| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/answers/:questionId`| GET | | `{ dataAnswer }`| 500 (Internal Server Error) | Get answers based on their questionId |
| `/answers/`| POST | `{title,content}`| `{answerCreated}`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Created an Answer |
| `/answers/upVote/:id` | PATCH | - | `${answerUpdated}` | 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | upVoted an answer |
| `/answers/downVote/:id` | PATCH | - | `${answerUpdated}`| 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | downVoted an answer|
| `/answers/:id` | PATCH | `${title,content} AUTHORIZATION REQUIRED` | `${answerUpdated}`| 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | updated an Answer|


# User

## Routing Register

    METHOD: POST
    http://localhost:3000/users/register

**Required:**

    body: {
	    username: String,
	    email: String,
	    password: String
    }
**Success Response:**

    Code: 201
    Content: {
	    userCreated
    }
**Error Response:**

    Code: 400
    Content: {
	    Email format is wrong
    } 

    
## Routing login

    METHOD: POST
    http://localhost:3000/users/login

**Required:**
	

    body: {
	    email: String,
	    password: String
    }
  
**Success Response:**

    Code: 200
    Content: {
	    token
    }

**Error Response:**

    Code: 401
    Content: {
	    error: "Email/password is wrong"
    }
 -->
