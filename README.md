# hacktivoverflow

# hacktivoverflow

## Routes:
| Route                                           | HTTP    | Headers(s) | Body      | Description                         
| ------                                          | ----    | ---------- | ----      | -------------------                 
| http://localhost:3000/api/users/register        | POST    | none       | register  | register manually (input from body) 
| http://localhost:3000/api/users/login           | POST    | none       | login     | login by email and password         
| http://localhost:3000/api/posts/findAll    | GET    | none       | post  | find all post
| http://localhost:3000/api/posts/findUser   | GET    | none       | post  | find all post by userId
| http://localhost:3000/api/posts/:id    | GET    | none       | post | find specific post
| http://localhost:3000/api/posts/create    | POST    | none       | post | create post
| http://localhost:3000/api/posts/:id    | DELETE    | none       | post  | delete post
| http://localhost:3000/api/posts/:id    | PATCH    | none       | post       | update post
| http://localhost:3000/api/posts/downvote/:id    | PATCH    | none       | post       | downvote post
| http://localhost:3000/api/posts/upvotes/:id    | PATCH    | none       | post        | upvote post
| http://localhost:3000/api/answers/create/:id   | POST    | none       |   answer     | create answer
| http://localhost:3000/api/answers/:id'   | DELETE    | none       |    answer    | delete answer
| http://localhost:3000/api/answers/getUpdate/:id   | GET    | none       | answer       | get edit answer data
| http://localhost:3000/api/answers/:id   | PATCH    | none       |    answer    | update answer data
