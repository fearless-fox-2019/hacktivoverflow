# hacktivoverflow

# mini-wp
## HTTP Methods
### Questions
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/questions|GET|-|-| **Code:** 200 <br>**Content:** <br> [ { title: "Question Title", description: "Lorem ipsum dolor sit ...", author: "johnsmith" }, ... ] |**Code:** 404<br> **Content:** { error : "questions doesn't exist" } |
|/api/questions|GET|:questionId|-| **Code:** 200 <br> **Content:**<br> { title: "Question Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" } |**Code:** 404<br>**Content:** { error : "Questiondoesn't exist" } |
|/api/questions|POST|-|data: Object| **Code:** 201 <br> **Content:**<br> { title: "Question Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" } |**Code:** 404<br>**Content:** { error: "Can't add product" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/questions|PUT|:questionId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { title: "Question Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" }  |**Code:** 404<br>**Content:** { error: "Can't replace product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/questions|PATCH|:questionId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { title: "Question Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" }  |**Code:** 404<br>**Content:** { error: "Can't update product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|
|/api/questions|DELETE|:questionId|id: String| **Code:** 200<br>**Content:**<br>{ title: "Question Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" }  |**Code:** 404<br>**Content:** { error: "Product doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|

### Answers
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/answers|GET|-|-| **Code:** 200 <br>**Content:** <br> [ { title: "Answer Title", description: "Lorem ipsum dolor sit ...", author: "johnsmith" }, ... ] |**Code:** 404<br> **Content:** { error : "answers doesn't exist" } |
|/api/answers|GET|:answerId|-| **Code:** 200 <br> **Content:**<br> { title: "Answer Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" } |**Code:** 404<br>**Content:** { error : "Answer doesn't exist" } |
|/api/answers|POST|-|data: Object| **Code:** 201 <br> **Content:**<br> { title: "Answer Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" } |**Code:** 404<br>**Content:** { error: "Can't add product" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/answers|PUT|:answerId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { title: "Answer Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" }  |**Code:** 404<br>**Content:** { error: "Can't replace product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/answers|PATCH|:answerId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { title: "Answer Title", description: "Lorem ipsum dolor sit ...", votes: [], questionId: "532d8e7d8326878237287, author: "johnsmith" } |**Code:** 404<br>**Content:** { error: "Can't update product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|

### Users
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/users/signin|POST|-|email: String, password: String| **Code:** 200<br>**Content:** <br> {token: "3821739218fewfer32rf2", username:"Aditya" }|**Code:** 400<br> **Content:** { error: "Wrong Email or Password "}  |
|/api/users/signup|POST|-|username: String, email: String, password: String| **Code:** 201<br>**Content:** { message: "User has been registered" } |**Code:** 400 <br> **Content:** { error: "Bad request}  |

