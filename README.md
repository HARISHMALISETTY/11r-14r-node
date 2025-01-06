Express.js is a minimal and flexible Node.jsweb application framework that provides a 
robust set of features to develop web and mobile applications. 
It simplifies the development process by offering a higher level of abstraction 
and numerous built-in functionalities.

Express.jsprovides a comprehensive set of features that make it easier to build and manage web applications. Its simplicity, flexibility, and extensive ecosystem have made it one of the most popular frameworks for Node.jsdevelopment.

command to intialise express in our backend project--> npm i express

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.



integrating mongodb in nodejs+expressjs:
---------------------------------------

1.first create express server.
2.integrate mongodb using mongoose library




bcrypt module is a nodejs  popular library used for encrypting the senstive information before storing in database for better secure.

1.generate salt
2.hashing
3.comparing


paswrd---harish---cbekjfnfchbvcvefvewcv--store in db
