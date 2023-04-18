# Let's Make Your Chat Application

This README provides instructions for setting up and starting our Chat Application. Follow the steps below to get started:

## Prerequisites
- Node.js (version 10 or higher)
- Yarn package manager (version 1.x)
- MongoDB instance with a valid connection URL

## Installation and Setup

1. Clone the repository to your local machine.
2. Install the Public Dependencies by running `yarn install` in the root directory of the project.
3. Install the Server Dependencies by running `cd server` and then `yarn install`.
4. In the Server Directory, create a new file named `.env` if it doesn't already exist.
5. Open the `.env` file in a text editor and set the value of `mongodb` to your MongoDB connection URL in the following format: `mongodb://<username>:<password>@<host>:<port>/<database>`
6. Save and close the `.env` file.
7. Start the server by running `yarn start` in the `server` directory.
8. In a new terminal window, start the React app by running `yarn start` in the `public` director.
9. Once the server and React app are running, you can access the Chat Application by navigating to `http://localhost:3000` in your web browser.

## Conclusion
Congratulations! You have successfully installed and started the Chat Application. If you have any questions or issues, please refer to our documentation or contact our support team for assistance.
