# RESTful API with NodeJS, ExpressJS, PassportJS, and JWT

Simple RESTful API built with NodeJS, ExpressJS, PassportJS, and JWT.
It mocks CRUD operations on JSON files using a service and controller layer.

The [recipes.json](./db/recipes.json) file contains recipe records;
GET requests for recipes are allowed for all users; POST, PUT, and DELETE requests for
recipes are only allowed for authenticated users.

The [user.json](./db/user.json) file contains uesr records representing users that have
signed up. You can get authenticated by sending a POST signup request, which will return
a JWT that you can attach to requests that need authentication.
Sending a POST login request after you have signed up will also return the needed JWT.

Import the [postman schema](./express_recipes.postman_collection.json) into postman
to see a description of each endpoint and test it.

You will need to create a `.env` file on the project's root directory and put the
following contents on it:

```
PORT=3000
JWT_SECRET=<replace with string you want to use as JWT secret>
```

Start the server by running:

```
npm install
npm run dev
```
