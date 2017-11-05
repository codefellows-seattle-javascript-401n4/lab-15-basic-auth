*routes/auth-routes*

_POST /signup_  

  Requires a username, email, and password. Returns 400 for all invalid/missing data.
  Checks agains db for preexisting username
  Calls generateHash(password) to set the hash in User model.
  Calls generateToken() to send token to authorized client.

_GET /signin_

  Requires username and password credentials for login
  Calls verifyPassword(password) to compare password to saved User hashAsync
  Calls generateToken to send token to verified client.
  Returns 401 for all Unauthorized login attempts
