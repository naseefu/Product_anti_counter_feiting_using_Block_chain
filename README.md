# Product Anti-Counterfeiting using Blockchain with QR Code Implementation

This project aims to combat product counterfeiting by leveraging blockchain technology along with QR code implementation. It consists of three main components: backend, frontend, and smart contract.

## Components

### 1. Backend
The backend of this project is built using Node.js. It handles the business logic and interacts with the database.

### 2. Frontend
The frontend is developed using React.js. It provides the user interface for interacting with the system.

### 3. Smart Contract
The smart contract component contains the blockchain smart contracts responsible for managing product authenticity and transactions.

## Installation

1. **Install Node Modules:**
   Run the following command in the terminal to install the required Node.js modules:
	
   	npm install


2. **Setup PostgreSQL:**
- Adjust the connection details in `postgres.js` to match your PostgreSQL configuration. You can find these details in your pgAdmin or PostgreSQL configuration file.
- Ensure PostgreSQL is running.

## Usage

1. **Run PostgreSQL:**
Start the PostgreSQL server. You can do this through pgAdmin or using a command-line interface.

2. **Run Backend:**
Navigate to the backend directory and run the following command to start the Node.js server:

	node postgres.js


Alternatively, you can use the following command:
	
	npm run Back-End


3. **Run Frontend:**
Open a new terminal window, navigate to the frontend directory, and run the following command to start the React.js application:

	npm start


4. **Access the Application:**
Once both the backend and frontend servers are running, you can access the application by visiting the provided URL in your web browser.

## Adjustments
Don't forget to adjust the connection details in `postgres.js` to match your PostgreSQL setup.

Feel free to reach out for any issues or queries!
