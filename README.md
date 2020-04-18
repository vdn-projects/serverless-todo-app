# Introduction
* This project is to demonstrate a simple TODO application writen in NodeJS as backend and ReactJS as front end. The backend project is deployed to AWS services including Lambda to host NodeJS project, API Gateway to HTTP requests, S3 to store images and DynamoDB to store user's TODO records. The process is supported by Serverless framework which produces CloudFormation template to start building expected infrastructure within AWS services.
* This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.
  <p align="center">
    <image src="images/todo-app.jpg" width="70%">
  </p>
# Usage
## Backend
* Configure the asymmetrically encrypted JWT tokens by passing JWK endpoint from your Auth0 application to `jwksUrl` in `backen/src/lambda/auth/auth0Authorizer.ts`
* Run below commands to deploy the backend project.

  ```bash
  cd backend
  npm install
  sls deploy -v --aws-profile your_aws_profile
  ```

## Frontend
* Configure the API endpoint (got from API gateway), domain & clientId (got from Auth0 application service) to `config.ts` file in the `client` folder.

  ```ts
  const apiId = '...' API Gateway id
  export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

  export const authConfig = {
    domain: '...',    // Domain from Auth0
    clientId: '...',  // Client id from an Auth0 application
    callbackUrl: 'http://localhost:3000/callback'
  }
  ```
* Run below commands to start the local webserver and you can interact with the React application and test API functionalities of Serverless Todo App. Go to `http://localhost:3000` on your browser to access the application.
  ```bash
  cd client
  npm install
  npm run start
  ``` 

# API test with Postman collection

An alternative way to test API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

* Click on the import button:
  <p align="left">
    <image src="images/import-collection-1.png" width="30%">
  </p>

* Click on the "Choose Files":
  <p align="left">
    <image src="images/import-collection-2.png" width="40%">
  </p>

* Select a file to import:
  <p align="left">
    <image src="images/import-collection-3.png" width="50%">
  </p>

* Right click on the imported collection to set variables for the collection.
  <p align="left">
    <image src="images/import-collection-4.png" width="35%">
  </p>

* Provide variables for the collection.Note that the token Id can get from web browser console while you succeed authentication step by logging with Google account.
  <p align="left">
    <image src="images/import-collection-5.png" width="50%">
  </p>