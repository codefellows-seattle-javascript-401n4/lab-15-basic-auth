In both of these labs for 16 and 17 I make requests to the server to create a user with a name, email and password. For a post request to the api /signup it creates a user and creates a hashed password. Then for the signin a get request is made and if the passwords match to that specific user then it sends back a 200. Then for lab 17 the post request to the api /sushi will create another user only if that user already has an id from an earlier resource. Then when a get request is made to the api /sushi it shows all the databased users. Lastly the delete request to the api /sushi/:id with a correct id that is already found will delete that user from the database. For the testing you need to have change the username, email, and password in my first test for a post to signin everytime you run a test because all the fields are supposed to be unique and the test will fail after you create it more then once. 
