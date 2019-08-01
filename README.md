## **Stacker Overflow**

## Endpoint

baseUrl = http:localhost:3000
### Doesn't need A Token

#### User Routes

| `Routes`        | `Method` | `Request Body`            | `Response Data`        | `Response Error`                                                                                                                                                      | `Description`       |
|-----------------|----------|---------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| /users/register | POST     | { name, email, password } | { access_token }       | 400(email has been registered!) <br>400(email format is wrong!)<br> 400(email required!)<br> 400(password length more than 6 characters!)<br> 400(password required!) | Register a new user |
| /users/login    | POST     | { email, password }       | { name, access_token } | 400(email/password wrong!)                                                                                                                                            | Log in              |

<br>
<br>

### Need A Token <br>
#### Post Routes

| `Routes`    | `Method` | `Request Body`   | `Response Data` | `Response Error`                                                                                                | `Description`                |
|-------------|----------|------------------|-----------------|-----------------------------------------------------------------------------------------------------------------|------------------------------|
| /posts           | GET      | -                | { data }        | <br> 500 (Internal Server Error)                                                                                | Get All Posts/Questions data |
| /posts/:id        | GET      | -                | { data }        | <br> 500 (Internal Server Error)                                                                                | Get Single data              |
| /posts/myPost     | GET      | -                | { data }        | <br> 500 (Internal Server Error)                                                                                | Get Single data              |
| /posts           | POST     | {title, content} | { data }        | 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error)                        | Create new Post/Question     |
| /posts/:id        | DELETE   | -                | { completed }   | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Post             |
| /posts/:id        | PATCH    | -                | { success }     | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Post               |
| /posts/upvote/:id | PATCH    | -                | { success }     | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Upvoting the post            |
| /posts/downvote/:id | PATCH    | -                | { success }     | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Downvoting the post          |

<br>
<br>

#### Answer Routes

| `Routes`    | `Method` | `Request Body`   | `Response Data` | `Response Error`                                                                                                | `Description`                |
|-------------|----------|------------------|-----------------|-----------------------------------------------------------------------------------------------------------------|------------------------------|
| /answer?PostId=:_id      | GET      | -                | { data }        | <br> 500 (Internal Server Error)                                                                                | Get Single data              |
| /answer          | POST     | {title, content} | { data }        | 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error)                        | Create new Answer     |
| /answer/:id        | DELETE   | -                | { completed }   | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Answer             |
| /answer/:id        | PATCH    | -                | { success }     | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Answer               |
| /answer/upvote/:id | PATCH    | -                | { success }     | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Upvoting the Answer            |
| /answer/upvote/:id | PATCH    | -                | { success }     | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Downvoting the Answer          |