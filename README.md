# **hacktivOverflow**

### List of comments routes:
Route | HTTP | Header(s) | Body | Description 
------------ | ------------- | ------------- | ------------- | ------------- 
/comments/postId/:id | GET | none | none | Get list of comments by postId 
/comments | POST | access_token:String | title: String, description: String | Create a comment
/comments/userId | GET | access_token:String | none | Find comments by userId
/comments/:id | PUT | access_token:String | title:String, description:String | Update a comment
/comments/upvotes/:id | PUT | access_token:String | none | Upvotes comments
/comments/downvotes/:id| PUT | access_token:String | none | Downvotes comments

### List of posts routes:
Route | HTTP | Header(s) | Body | Description 
------------ | ------------- | ------------- | ------------- | ------------- 
/posts | GET | none | none | Get list of posts info 
/posts/id/:id | GET | access_token:String | none | Get single posts info
/posts/userId | GET | access_token:String | none | Find post by userId
/posts| POST | access_token:String | title:String, description:String, tags:Array | Create a post
/posts/:id | PUT | access_token:String | title:String, description:String, tags:Array | Update a post
/posts/addcomment/:id | PUT | access_token:String | title:String, description:String | Create a comment
/posts/upvotes/:id | PUT | access_token:String | none | Upvotes posts
/posts/downvotes/:id| PUT | access_token:String | none | Downvotes posts
/posts/:id | DELETE | access_token:String | none | Delete a posts

### List of users routes:
Route | HTTP | Header(s) | Body | Description 
------------ | ------------- | ------------- | ------------- | ------------- 
/users/signin/ | POST | none | email:String, password:String | SignIn User
/users/signup/| POST | none | name:String, email:String, password:String | SignUp User
/users/savetag/| PATCH | access_token:String | tag | Watch Tag
/users/deletetag/| PATCH | access_token:String | index | Remove watched Tag
/users| GET | access_token:String | none | get all users

* $ npm install
* $ npm run dev