# E-COMMERCE SHOES API
Welcome to an E-Commerce based on Shoes API! Here I will show you how to use my RESTFUL APIs and make different queries listed below!

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

### CRUD Routing for questions
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/questions/allquestions`| GET | -| `{ data }`| 500 (Internal Server Error) | 
| `/questions/:id` | GET | - | `${questionDetail}` | 500(internal server error) |
| `/questions/highestVote` | GET | - | `${highestVotePost}` | 500(internal server error) |
### FROM HERE, TOKEN IS REQUIRED(LOGIN FIRST)
| `/questions/:id` | PATCH | `{title,content} AUTHORIZATION REQUIRED`| `{ dataUpdated }`| 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) |Updated a question|
| `/questions/`| POST | `{title,content}`  | `{questionCreated}`| 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Successfully created a new Question! |
| `/questions/:id` | DELETE| `AUTHORIZATION REQUIRED` | `deleted`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Deleted a question|
| `/questions/upVote/:id` | PATCH |  | `upvoted`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | upVoted a question|
| `/questions/downVote/:id` | PATCH |  | `downvoted`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | downVoted a question|


####  Answer Routes 

| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/answers/:questionId`| GET | | `{ dataAnswer }`| 500 (Internal Server Error) | Get answers based on their questionId |
| `/answers`| POST | `{userId, productId, quantity}`| `{ data }`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Created a Cart|
| `/carts/:userId` | GET | - | `${dataCart}` | 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | get a Cart based on userId|
| `/carts/:id` | DELETE | - | `deleted`| 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Deleted a shoe|
| `/carts/checkout`| PATCH | `{userId}` | `updated` | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Successfully checked out|

####  Transaction Routes 

###  token is required!
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/transactions/`| POST | `{[products], totalPrice}`| `{ dataCreated }`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | created a transaction|
| `/transactions/` | GET | - | `{dataTransaction}` | 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | get transaction list based on user|




<!-- # REST
Base url : http://localhost:3000/api
Sample Request

    {
	    "users": http://localhost:3000/api/users,
	    "shoes": http://localhost:3000/api/shoes,
	    "transactions": http://localhost:3000/api/transactions,
	    "cart": http://localhost:3000/api/carts
    }

There are three available resources:

 - User: used to Login or Register to your account
 - Shoes: CRUD shoes (admin only)
 - transactions: after checking out from cart, transactions will be here
 - carts: user can add their products to the cart

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
