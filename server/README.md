# H8Overflow

## Geting Started
- npm install
- Run `nodemon app.js or npm run dev` to start the server.
- Run `npm run dev` to start the client
- baseUrl: http://localhost:3000

## Feature
- Register
- Login
- Login With Google
- Get User
- Post Question
- Watch Tag
- Update Question
- Delete Question
- Upvote Question
- Downvote Question
- Post Answer
- Update Answer
- Upvote Answer
- Downvote Answer

## Routes
### User Route
#### Register

    URL: ${baseUrl}/users/register
    Method: POST
    Headers: none
    params: none
    body: {name: String, email: String, password: String, userTags: Array}
    Success Response: 
        Code 201:
            {
                "userTags": [],
                "_id": "5d43ac6c9284ae07e2142d85",
                "name": "Ana Meilani Puspitasari",
                "email": "anameilani@mail.com",
                "password": "$2b$10$fzATT0Kf8VBUde09UJ.YFeJ2kcokZcZiJKgSGO3CXQBPQQhbaBdea",
                "__v": 0
            }
    Error Response:
        Code 500:
        Content: {message: 'Internal Server Error'}

#### Login

    URL: ${baseUrl}/users/login
    Method: POST
    Headers: none
    params: none
    body: {email: String, password: String}
    Success Response: 
        Code 200:
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDNhYzZjOTI4NGFlMDdlMjE0MmQ4NSIsImVtYWlsIjoiYW5hbWVpbGFuaUBtYWlsLmNvbSIsIm5hbWUiOiJBbmEgTWVpbGFuaSBQdXNwaXRhc2FyaSIsImlhdCI6MTU2NDcxNjE5MH0.mB6S_Ri4IE1nixW_qdWkFcMG8JOKTUK9ilv1mFLqouo",
                "tags": [],
                "userId": "5d43ac6c9284ae07e2142d85",
                "name": "Ana Meilani Puspitasari"
            }
    Error Response:
        Code 404:
        Content: {message: 'Wrong Email/Password'}

#### Login With Google

    URL: ${baseUrl}/users/loginGoogle
    Method: POST
    Headers: none
    params: none
    body: none
    Success Response: 
        Code 200:
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjRhZjYwNmJkNTkzMTkwYzM1Y2ZiYSIsImVtYWlsIjoiYW5hQG1haWwuY29tIiwibmFtZSI6ImFuYSIsImlhdCI6MTU2MzA4Nzg3NiwiZXhwIjoxNTYzMDkxNDc2fQ.6scundMCsMz94JwAE0qdRRWN55UDTwf3KQ12v5OZdJg",
                "tags": [],
                "userId": "5d43ac6c9284ae07e2142d85",
                "name": "Ana Meilani Puspitasari"
            }
    Error Response:
        Code 500:
        Content: {message: 'Internal Server Error'}

#### Get User

    URL: ${baseUrl}/users
    Method: GET
    Headers: token
    params: none
    body: none
    Success Response: 
        Code 200:
            {
                "userTags": [],
                "_id": "5d43ac6c9284ae07e2142d85",
                "name": "Ana Meilani Puspitasari",
                "email": "anameilani@mail.com",
                "password": "$2b$10$fzATT0Kf8VBUde09UJ.YFeJ2kcokZcZiJKgSGO3CXQBPQQhbaBdea",
                "__v": 0
            }
    Error Response:
        Code 500:
        Content: {message: 'Internal Server Error'}


### Question Route
#### Create New Question

    URL: ${baseUrl}/questions
    Method: POST
    Headers: token
    params: none
    body: form data {title: string, description: string, tags: Array}
    Success Response: 
        Code 200:
            {
                "tags": [
                    "deploy",
                    "AWS",
                    "EC2"
                ],
                "upvotes": [],
                "downvotes": [],
                "answers": [],
                "_id": "5d43af439284ae07e2142d88",
                "title": "Bagaimana cara deploy aws EC2?",
                "description": "Bagaiamana cara deploy server di AWS EC2?",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:34:27.281Z",
                "updatedAt": "2019-08-02T03:34:27.281Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get All Question

    URL: ${baseUrl}/questions
    Method: GET
    Headers: token
    params: none
    body: none
    Success Response: 
        Code 200:
            [
                {
                    "tags": [
                        "deploy",
                        "AWS",
                        "EC2"
                    ],
                    "upvotes": [],
                    "downvotes": [],
                    "answers": [],
                    "_id": "5d43af439284ae07e2142d88",
                    "title": "Bagaimana cara deploy aws EC2?",
                    "description": "Bagaiamana cara deploy server di AWS EC2?",
                    "userId": {
                        "_id": "5d43ac6c9284ae07e2142d85",
                        "name": "Ana Meilani Puspitasari"
                    },
                    "createdAt": "2019-08-02T03:34:27.281Z",
                    "updatedAt": "2019-08-02T03:34:27.281Z",
                    "__v": 0
                },
                {
                    "tags": [
                        "google sign in",
                        "g-sign-in",
                        "google"
                    ],
                    "upvotes": [
                        "5d42d2c90052de46470d6c22"
                    ],
                    "downvotes": [],
                    "answers": [],
                    "_id": "5d43a3b69284ae07e2142d80",
                    "title": "Google sign in error",
                    "description": "&nbsp;error: \"popup_closed_by_user\" saat login menggunakan firefox.<div>padahal udah dimasukin url deploy di white list client_id<br><div>Tolong dibantu ya ^_^</div></div>",
                    "userId": {
                        "_id": "5d42d2c90052de46470d6c22",
                        "name": "ana meilani"
                    },
                    "createdAt": "2019-08-02T02:45:10.978Z",
                    "updatedAt": "2019-08-02T03:04:01.712Z",
                    "__v": 0
                }
            ]
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get Specific Question

    URL: ${baseUrl}/questions/details/:id
    Method: GET
    Headers: token
    params: /5d43af439284ae07e2142d88
    body: none
    Success Response: 
        Code 200:
            {
                "tags": [
                    "deploy",
                    "AWS",
                    "EC2"
                ],
                "upvotes": [],
                "downvotes": [],
                "answers": [],
                "_id": "5d43af439284ae07e2142d88",
                "title": "Bagaimana cara deploy aws EC2?",
                "description": "Bagaiamana cara deploy server di AWS EC2?",
                "userId": {
                    "_id": "5d43ac6c9284ae07e2142d85",
                    "name": "Ana Meilani Puspitasari"
                },
                "createdAt": "2019-08-02T03:34:27.281Z",
                "updatedAt": "2019-08-02T03:34:27.281Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get My Question

    URL: ${baseUrl}/questions/mypost
    Method: GET
    Headers: token
    params: none
    body: none
    Success Response: 
        Code 200:
            [
                {
                    "tags": [
                        "deploy",
                        "AWS",
                        "EC2"
                    ],
                    "upvotes": [],
                    "downvotes": [],
                    "answers": [],
                    "_id": "5d43af439284ae07e2142d88",
                    "title": "Bagaimana cara deploy aws EC2?",
                    "description": "Bagaiamana cara deploy server di AWS EC2?",
                    "userId": "5d43ac6c9284ae07e2142d85",
                    "createdAt": "2019-08-02T03:34:27.281Z",
                    "updatedAt": "2019-08-02T03:34:27.281Z",
                    "__v": 0
                }
            ]
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Update Question

    URL: ${baseUrl}/questions/:id
    Method: PATCH
    Headers: token
    params: none
    body: any field
    Success Response: 
        Code 200:
            {
                "tags": [
                    "deploy",
                    "AWS",
                    "EC2"
                ],
                "upvotes": [],
                "downvotes": [],
                "answers": [],
                "_id": "5d43af439284ae07e2142d88",
                "title": "Bagaimana cara deploy aws EC2?",
                "description": "Bagaiamana cara deploy server di AWS EC2?",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:34:27.281Z",
                "updatedAt": "2019-08-02T03:34:27.281Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}


#### Upvote Question

    URL: ${baseUrl}/questions/upvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: none
    Success Response: 
        Code 200:
            {
                "tags": [
                    "deploy",
                    "AWS",
                    "EC2"
                ],
                "upvotes": ["5d43ac6c9284ae07e2142d85"],
                "downvotes": [],
                "answers": [],
                "_id": "5d43af439284ae07e2142d88",
                "title": "Deploy aws EC2",
                "description": "Bagaiamana cara deploy server di AWS EC2?",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:34:27.281Z",
                "updatedAt": "2019-08-02T03:49:23.094Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Downvote Question

    URL: ${baseUrl}/questions/downvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: none
    Success Response: 
        Code 200:
            {
                "tags": [
                    "deploy",
                    "AWS",
                    "EC2"
                ],
                "upvotes": [],
                "downvotes": ["5d43ac6c9284ae07e2142d85"],
                "answers": [],
                "_id": "5d43af439284ae07e2142d88",
                "title": "Deploy aws EC2",
                "description": "Bagaiamana cara deploy server di AWS EC2?",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:34:27.281Z",
                "updatedAt": "2019-08-02T03:49:23.094Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}


#### Delete Question

    URL: ${baseUrl}/questions/:id
    Method: DELETE
    Headers: token
    params: /5d43ae329284ae07e2142d86
    body: none
    Success Response: 
        Code 200:
                {
                    "n": 0,
                    "opTime": {
                        "ts": "6720407028235239426",
                        "t": 12
                    },
                    "electionId": "7fffffff000000000000000c",
                    "ok": 1,
                    "operationTime": "6720407028235239426",
                    "$clusterTime": {
                        "clusterTime": "6720407028235239426",
                        "signature": {
                            "hash": "to1FV3g+ht5vin3lwD6RP+lNOIU=",
                            "keyId": "6682720129026883585"
                        }
                    },
                    "deletedCount": 0
                },
                {
                    "tags": [
                    "deploy",
                    "AWS",
                    "EC2"
                    ],
                    "upvotes": [],
                    "downvotes": [],
                    "answers": [],
                    "_id": "5d43ae329284ae07e2142d86",
                    "title": "Bagaimana cara deploy aws EC2?",
                    "description": "Bagaiamana cara deploy server di AWS EC2?",
                    "userId": "5d43ac6c9284ae07e2142d85",
                    "createdAt": "2019-08-02T03:29:54.838Z",
                    "updatedAt": "2019-08-02T03:29:54.838Z",
                    "__v": 0
                }
            
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

### Answer Route
#### Create New Answer

    URL: ${baseUrl}/answer
    Method: POST
    Headers: token
    params: none
    body: form data {title: string, description: string, questionId: objectId}
    Success Response: 
        Code 200:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d43b4049284ae07e2142d89",
                "title": "baca dokumentasi",
                "description": "baca dokumentasinya aja woy",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:54:44.734Z",
                "updatedAt": "2019-08-02T03:54:44.734Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get Logged User Answer

    URL: ${baseUrl}/answer
    Method: GET
    Headers: token
    params: none
    body: none
    Success Response: 
        Code 200:
            [
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d43b4049284ae07e2142d89",
                    "title": "baca dokumentasi",
                    "description": "baca dokumentasinya aja woy",
                    "userId": {
                        "userTags": [],
                        "_id": "5d43ac6c9284ae07e2142d85",
                        "name": "Ana Meilani Puspitasari",
                        "email": "anameilani@mail.com",
                        "password": "$2b$10$fzATT0Kf8VBUde09UJ.YFeJ2kcokZcZiJKgSGO3CXQBPQQhbaBdea",
                        "__v": 0
                    },
                    "createdAt": "2019-08-02T03:54:44.734Z",
                    "updatedAt": "2019-08-02T03:54:44.734Z",
                    "__v": 0
                }
            ]
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get Specific Answer

    URL: ${baseUrl}/answer/details/:id
    Method: GET
    Headers: token
    params: /5d43b4049284ae07e2142d89
    body: none
    Success Response: 
        Code 200:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d43b4049284ae07e2142d89",
                "title": "baca dokumentasi",
                "description": "baca dokumentasinya aja woy",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:54:44.734Z",
                "updatedAt": "2019-08-02T03:54:44.734Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Update Answer

    URL: ${baseUrl}/answer/:id
    Method: GET
    Headers: token
    params: /5d43b4049284ae07e2142d89
    body: none
    Success Response: 
        Code 200:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d43b4049284ae07e2142d89",
                "title": "dokumentasi",
                "description": "baca dokumentasinya aja gaes",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:54:44.734Z",
                "updatedAt": "2019-08-02T04:01:36.814Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Upvote Question

    URL: ${baseUrl}/answers/upvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: none
    Success Response: 
        Code 200:
            {
                "upvotes": ["5d43ac6c9284ae07e2142d85"],
                "downvotes": [],
                "_id": "5d43b4049284ae07e2142d89",
                "title": "dokumentasi",
                "description": "baca dokumentasinya aja gaes",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:54:44.734Z",
                "updatedAt": "2019-08-02T04:01:36.814Z",
                "__v": 0
            }
            
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Downvote Question

    URL: ${baseUrl}/answers/downvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: none
    Success Response: 
        Code 200:
            {
                "upvotes": [],
                "downvotes": ["5d43ac6c9284ae07e2142d85"],
                "_id": "5d43b4049284ae07e2142d89",
                "title": "dokumentasi",
                "description": "baca dokumentasinya aja gaes",
                "userId": "5d43ac6c9284ae07e2142d85",
                "createdAt": "2019-08-02T03:54:44.734Z",
                "updatedAt": "2019-08-02T04:01:36.814Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}