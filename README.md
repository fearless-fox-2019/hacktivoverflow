# hacktivoverflow

> Deploy Link

[Link Deploy](http://kodeposit.irshadibagas.com)



### User Routes

#### User SignUp

| Routes          | Method | Request Body                              | Response Data      | Description         |
| --------------- | ------ | ----------------------------------------- | ------------------ | ------------------- |
| `/users/signup` | POST   | `{ fullname, username, email, password }` | `{ access_token }` | Register a new user |

#### Return

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzJlNzQ1YzY1MWFmM2IwZDJiYmEwMiIsImVtYWlsIjoiYmFnYXNwdXRyby5pcnNoYWRpQGdtYWlsLmNvbSIsImlhdCI6MTU2Mzc1NjI5M30.PUD3zcTRrdU_PfgHcYKG0IuB6A4IIcWg2Q7PBOuOjrk",
    "loggedUser": {
        "username": "irshadi",
        "fullname": "Irshadi Bagasputro"
    }
}

### Question Routes



### Answer Routes

