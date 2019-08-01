# stackoverload API

## Auth

* ### REGISTER

URL STRUCTURE

    POST http://localhost:3000/auth/register

REQUEST BODY

```js
{
  "email": "test@mail.com",
  "username": "test12345"
  "password": "password"
}
```

RESPONSE **201**

```js
{
    "_id": "5d42b6faab149854ad49ca13",
    "email": "testin@gmail.com",
    "username": "testest",
    "password": "$2a$10$4Xv0qzp2umLK2fZn/VvyA.Ns53ivd/K351Rl8STwQJGs2kqw.FOKm",
    "__v": 0
}
```

ERROR **BAD REQUEST (400) - DUPLICATE EMAIL**

```js
{
    "message": "Email or Username is already used"
}
```

ERROR **BAD REQEUST (400) -  WITHOUT EMAIL**

```js
{
    "message": "user validation failed: email: User email is required"
}
```

* ### LOGIN

URL STRUCTURE

    http://localhost:3000/auth/login

REQUEST BODY

```js
{
  "email": "testin@gmail.com",
  "password": "password" 
}
```

RESPONSE **200**

```js
{
    "id": "5d42b6faab149854ad49ca13",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJiNmZhYWIxNDk4NTRhZDQ5Y2ExMyIsImVtYWlsIjoidGVzdGluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdGVzdCIsImlhdCI6MTU2NDY1MzU5OH0.0hfn7FvzUMYZwKV0hsuXmPEPKXu0FeYVMikIsfe04Jo"
}
```

ERROR **UNAUTHORIZED (401) - WRONG PASSWORD**

```js
{
    "message": "Email or password is invalid"
}
```

***

## QUESTION

* ### CREATE

URL STRUCTURE
      
    POST http://localhost:3000/questions

REQUEST BODY

```js
{
  "title": "Apa itu node js?",
  "description": "Apakah ada yang bisa membantu menjelaskan tentang node JS?"
}
```

REQUEST HEADERS

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJiNmZhYWIxNDk4NTRhZDQ5Y2ExMyIsImVtYWlsIjoidGVzdGluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdGVzdCIsImlhdCI6MTU2NDY1MzU5OH0.0hfn7FvzUMYZwKV0hsuXmPEPKXu0FeYVMikIsfe04Jo"
}
```

RESPONSE **201**

```js
{
    "_id": "5d42bd8aab149854ad49ca18",
    "title": "Apa itu node js?",
    "description": "Apakah ada yang bisa membantu menjelaskan tentang node JS?",
    "owner": "5d3ecb16f4de7e34f7568737",
    "votes": [],
    "createdAt": "2019-08-01T10:23:06.864Z",
    "updatedAt": "2019-08-01T10:23:06.864Z",
    "__v": 0
}
```

* ### UPDATE

URL STRUCTURE

    PUT http://localhost:3000/questions/5d42bd8aab149854ad49ca18

REQUEST BODY

```js
{
  "title": "URGENT!!! Bantu jelasin node js!!!?"
}
```

REQUEST HEADERS

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJiNmZhYWIxNDk4NTRhZDQ5Y2ExMyIsImVtYWlsIjoidGVzdGluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdGVzdCIsImlhdCI6MTU2NDY1MzU5OH0.0hfn7FvzUMYZwKV0hsuXmPEPKXu0FeYVMikIsfe04Jo"
}
```

RESPONSE **200**

```js
{
    "_id": "5d42bd8aab149854ad49ca18",
    "title": "URGENT!!! Bantu jelasin node js!!!?",
    "description": "Apakah ada yang bisa membantu menjelaskan tentang node JS?",
    "owner": "5d3ecb16f4de7e34f7568737",
    "votes": [],
    "createdAt": "2019-08-01T10:23:06.864Z",
    "updatedAt": "2019-08-01T10:26:39.785Z",
    "__v": 0
}
```
* ### VOTE

URL STRUCTURE

    http://localhost:3000/questions/vote/5d42bd8aab149854ad49ca18?type=up

REQUEST QUERY PARAMS

    VOTE UP: type=up
    VOTE DOWN: type=down

RESPONSE **200**

```js
{
    "_id": "5d42bd8aab149854ad49ca18",
    "title": "URGENT!!! Bantu jelasin node js!!!?",
    "description": "Apakah ada yang bisa membantu menjelaskan tentang node JS?",
    "owner": "5d3ecb16f4de7e34f7568737",
    "votes": [
        {
            "_id": "5d42bfedab149854ad49ca19",
            "user": "5d3ecb16f4de7e34f7568737",
            "voteNumb": 1
        }
    ],
    "createdAt": "2019-08-01T10:23:06.864Z",
    "updatedAt": "2019-08-01T10:33:17.247Z",
    "__v": 0
}
```

* ### FIND BY ID

URL STRUCTURE

    http://localhost:3000/questions/5d42bd8aab149854ad49ca18


RESPONSE **200**
```js
{
    "_id": "5d42bd8aab149854ad49ca18",
    "title": "URGENT!!! Bantu jelasin node js!!!?",
    "description": "Apakah ada yang bisa membantu menjelaskan tentang node JS?",
    "owner": {
        "_id": "5d3ecb16f4de7e34f7568737",
        "email": "hendrix@mail.com",
        "username": "hendrix",
        "password": "$2a$10$KQ2GatlEHXtRsbZ3ryF9uOBLeC6vJV8GLTcFUKEXP2xJzQE85aP0u",
        "__v": 0
    },
    "votes": [
        {
            "_id": "5d42bfedab149854ad49ca19",
            "user": "5d3ecb16f4de7e34f7568737",
            "voteNumb": 1
        }
    ],
    "createdAt": "2019-08-01T10:23:06.864Z",
    "updatedAt": "2019-08-01T10:33:17.247Z",
    "__v": 0
}
```

* ### FIND ALL

URL STRUCTURE

    http://localhost:3000/questions

RESPONSE **200**

```js
[
  {
      "_id": "5d4252511bf9930b456ccb4c",
      "title": "How to uninstall npm modules in node js?",
      "description": "As commonly known, any npm module can be installed by running a simple command: npm install <module_name>.\n\nI have installed a few modules that I do not use anymore and I just want to get them off. I have a few questions regarding this:\n\nDo we have any command or process to uninstall a module from the root (something like npm uninstall <module_name>) or will simply removing the module files do?\n\nHow does it affect us if we keep the unused modules?",
      "owner": {
          "_id": "5d4186f9f45d0e43cb806bcd",
          "email": "test@mail.com",
          "username": "test1234",
          "password": "$2a$10$59US7iDF24ef83AEjEnM3urOPmV6cy8xMiDiV5yRwYDL9wwqyr3mu",
          "__v": 0
      },
      "votes": [
          {
              "_id": "5d42608cb0e72b18172d023e",
              "user": "5d4186f9f45d0e43cb806bcd",
              "voteNumb": 1
          }
      ],
      "createdAt": "2019-08-01T02:45:37.023Z",
      "updatedAt": "2019-08-01T03:46:20.507Z",
      "__v": 0
  },
  {
      "_id": "5d42bd8aab149854ad49ca18",
      "title": "URGENT!!! Bantu jelasin node js!!!?",
      "description": "Apakah ada yang bisa membantu menjelaskan tentang node JS?",
      "owner": {
          "_id": "5d3ecb16f4de7e34f7568737",
          "email": "hendrix@mail.com",
          "username": "hendrix",
          "password": "$2a$10$KQ2GatlEHXtRsbZ3ryF9uOBLeC6vJV8GLTcFUKEXP2xJzQE85aP0u",
          "__v": 0
      },
      "votes": [
          {
              "_id": "5d42bfedab149854ad49ca19",
              "user": "5d3ecb16f4de7e34f7568737",
              "voteNumb": 1
          }
      ],
      "createdAt": "2019-08-01T10:23:06.864Z",
      "updatedAt": "2019-08-01T10:33:17.247Z",
      "__v": 0
  }
]
```
***

## ANSWER

* ### CREATE

URL STRUCTURE

    http://localhost:3000/answers

REQUEST BODY

```js
{
  "answer": "Node.js adalah platform perangkat lunak pada sisi-server dan aplikasi jaringan. Ditulis dengan bahasa JavaScript dan dijalankan pada Windows, Mac OS X, dan Linux tanpa perubahan kode program."
}
```

REQUEST HEADERS

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJiNmZhYWIxNDk4NTRhZDQ5Y2ExMyIsImVtYWlsIjoidGVzdGluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdGVzdCIsImlhdCI6MTU2NDY1MzU5OH0.0hfn7FvzUMYZwKV0hsuXmPEPKXu0FeYVMikIsfe04Jo",
  "question": "5d42bd8aab149854ad49ca18"
}
```

RESPONSE **200**

```js
{
    "_id": "5d42c2a1ab149854ad49ca1c",
    "answer": "Node.js adalah platform perangkat lunak pada sisi-server dan aplikasi jaringan. Ditulis dengan bahasa JavaScript dan dijalankan pada Windows, Mac OS X, dan Linux tanpa perubahan kode program.",
    "question": "5d42bd8aab149854ad49ca18",
    "owner": "5d3ecb16f4de7e34f7568737",
    "votes": [],
    "createdAt": "2019-08-01T10:44:49.481Z",
    "updatedAt": "2019-08-01T10:44:49.481Z",
    "__v": 0
}
```

* ### FIND ALL

URL STRUCTURED

    http://localhost:3000/answers/5d42bd8aab149854ad49ca18

RESPONSE **200**

```js
[
    {
        "_id": "5d42c2a1ab149854ad49ca1c",
        "answer": "Node.js adalah platform perangkat lunak pada sisi-server dan aplikasi jaringan. Ditulis dengan bahasa JavaScript dan dijalankan pada Windows, Mac OS X, dan Linux tanpa perubahan kode program.",
        "question": "5d42bd8aab149854ad49ca18",
        "owner": {
            "_id": "5d3ecb16f4de7e34f7568737",
            "email": "hendrix@mail.com",
            "username": "hendrix",
            "password": "$2a$10$KQ2GatlEHXtRsbZ3ryF9uOBLeC6vJV8GLTcFUKEXP2xJzQE85aP0u",
            "__v": 0
        },
        "votes": [],
        "createdAt": "2019-08-01T10:44:49.481Z",
        "updatedAt": "2019-08-01T10:44:49.481Z",
        "__v": 0
    }
]
```