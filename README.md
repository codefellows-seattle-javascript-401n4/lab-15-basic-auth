POST/signup echo '{"username":"username", "password":"password"}' | http :3000/signup server should issue hashed token status code 200 if OK status code 400 issued for bad request i.e. no username or password

GET/signin using httpie - http :3000/signin -a username:password server should respond with hashed token created during signup status code 200 if OK status code 401 if username or password incorrect

GET/pi Incorrect route will generate 404 status code Not Found
