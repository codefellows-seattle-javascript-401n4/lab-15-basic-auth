


## Server Endpoints
### `/api/signup`
* `POST` request
* the client passes the username and password in the body of the request
* the server responds with a jwt token 
* the server  responds with **400 Bad Request** to a failed request

### `/api/signin`
* `GET` request
* the client passes the username and password to the server using a `Basic:` authorization header
* the server  responds with a token for authenticated users
* the server responds with **401 Unauthorized** for non-authenticated users

## Tests
* all of the following done:
* `/api/signup`
* `POST` - test **400**, if no request body has been provided or the body is invalid
* `POST` - test **200**, if the request body has been provided and is valid
* `/api/signin`
* `GET` - test **401**, if the user could not be authenticated
* `GET` - test **200**, responds with token for a request with a valid basic authorization header
