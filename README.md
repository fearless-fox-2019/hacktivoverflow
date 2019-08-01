# hacktivoverflow

#### STACKAE built Express and Monggose in server.

### User

Routes | HTTP | Body | Description | Error Response  | 
------ | ---- | ---- | ----------- | -----------
/api/users/signup | POST | username:String, email:String, password:String | Register new user | username is empty 400, email is empty 400, password is empty 400
/api/users/signin | POST | username:String,password:String | Logging in user | username/password invalid 401
/api/users/signin/google | POST | google account | Logging in user with google account
/api/users/confirmaton/:token | GET | token and email user | Confirmation email verification


### Product

Routes | HTTP | Body | Description | Error Response  | Middlewares
------ | ----- | ----- | -------- | -------- | ---
/api/questions | GET | none | Show the questions | none | 
/api/questions/:id | GET | none | Get a single question info | none |  
/api/questions | POST | question:String, ownerQuestion:"user" upVotes:[user] downVotes:[user] title:string | Create new question | error 400 on question,title,owberQuestion and 401 login | Login Authenthication
/api/questions/:id | DELETE | none | Delete by id | none |  Login Authentication & Authorization by owner only 
/api/questions/:id | PUT | input new updated data | Edit your list (will change the whole data) |  error 401 on  question,title, login  |  Login Authentication & Authorization by owner only
/api/questions/upvote/:id | POST | none | push user to array | none | Login Authentication 
/api/questions/downvote/:id | POST | none | push user to array | none |  Login Authentication
/api/questions/getQuotes | GET | none | Get a single quotes| none |  
### Answer

Routes | HTTP | Body | Description | Error Response  | Middlewares
------ | ----- | ----- | -------- | -------- | ---
/api/answers/:id | GET | none | Show the answer of questions user pick | none |
/api/answers/upvote/:id | POST | none | push user to array | none | Login Authentication 
/api/answers/downvote/:id | POST | none | push user to array | none |  Login Authentication
/api/answers | POST | answer:String, answerer:user, answerdQuestion : question | Create new answer |title err 400, login please 401 | Login Authenthication
/api/answers/:id | PUT | none | update data by id | login please 401, authorization 404 |  Login Authentication & Authorization by owner only


## Usage
 Make sure you have Node.js and npm installed in your computer, and then run these commands:
 ```
 $ npm install
 $ npm run dev
 ```

 Access the Web via http://stack-ae.muhrezbas.xyz

