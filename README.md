# hacktivoverflow

## Deploy Link
http://iflow.irsantyohadi.com/

## Endpoint

baseUrl = http:localhost:3000/


#### User Routes
| Routes                               | Method | Request Body                    | Response Data      | Response Error                                                                                            | Description          |
|--------------------------------------|--------|---------------------------------|--------------------|-----------------------------------------------------------------------------------------------------------|----------------------|
| `/users/signup`                      | POST   | `{ username, email, password }` | `{ access_token }` | 400 (`{email}` already used) <br>400 (`{email}` is not a valid email!) <br>  (`${username}` already used) | Register a new user  |
| `/users/signin`                      | POST   | `{ username, password }`        | `{ access_token }` | 400 (Invalid email/password)                                                                              | Log in               |
| `/users/` (`{ headers: { token } }`) | PATCH  | `{ answers , questions }`       | `{ data , msg }`   | 500 (Internal Server Error) <br> 400(invalid token)                                                       | Update Cart for user |
| `/users/`                            | GET    |                                 |                    | 500 (Internal Server Error)                                                                               | Find All User        |

### Token is required!

#### Question Routes (`{ headers: { token } }`)

| Routes                             | Method | Request Body           | Response Data        | Response Error                                                                                                            | Description                                      |
|------------------------------------|--------|------------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `/questions/` (not required token) | GET    | -                      | `{ data }`           | 500 (Internal Server Error)                                                                                               | get detail products                              |
| `/questions/`                      | POST   | `{title,description}`  | `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User)                                                           | Create a new Question!                           |
| `/questions/:id`                   | DELETE | -                      | `{ deleted }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Delete Question                                  |
| `/questions/:id/upvote`            | PATCH  |                        | `{ updated }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                         | for update Upvote of the question                |
| `/questions/:id/downvote`          | PATCH  |                        | `{ updated }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                         | for update DownVote of the question              |
| `/questions/:id`                   | PUT    | `{title, description}` | `{ updated }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                         | for update title and description of the question |


#### Answer Routes (`{ headers: { token } }`)

| Routes                             | Method | Request Body           | Response Data        | Response Error                                                                                                            | Description                                      |
|------------------------------------|--------|------------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `/answers/` (not required token) | GET    | -                      | `{ data }`           | 500 (Internal Server Error)                                                                                               | get detail products                              |
| `/answers/`                      | POST   | `{ description }`  | `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User)                                                           | Create a new Question!                           |
| `/answers/upvote`            | PATCH  |                        | `{ updated }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                         | for update Upvote of the answer                |
| `/answers/downvote`          | PATCH  |                        | `{ updated }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                         | for update DownVote of the answer              |
| `/answers/:id`                   | PUT    | `{ description}` | `{ updated }`        | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                         | for update description of the answer |

#### API Routes

| Routes                             | Method | Request Body           | Response Data        | Response Error                                                                                                            | Description                                      |
|------------------------------------|--------|------------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `/api/jobs`  | GET    | -                      | `{ data }`           | 500 (Internal Server Error)                                                                                               | get data jobs                              |
