# Timesheet Management API Server

This repository contains the backend API server for the Timesheet Management Application, implemented using Node.js and Express.js. The server supports user and admin authentication, timesheet management, and other related functionalities.

## Directory Structure
```
└── lokeshvivek2511-timesheet-server-node/
    ├── admin.json
    ├── user.json
    ├── timesheet.json
    ├── server.js
    ├── public/
    │   └── index.html
    ├── package.json
    ├── netlify.toml
    └── functions/
        └── api.js
```

## Features
- **User Authentication**: Sign-up and sign-in functionalities for users.
- **Admin Authentication**: Separate endpoint for admin login.
- **Timesheet Management**: Add, view, and update timesheets.
- **Admin Controls**: Admin can view all timesheets and update their statuses.
- **Hosted on Netlify**: Configured to run on the Netlify Functions platform.

## Endpoints

### User Authentication
- **POST** `/api/signup` - Register a new user.
- **POST** `/api/signin` - Log in an existing user.

### Timesheet Management
- **POST** `/api/addtimesheet` - Add or update a timesheet for a user.
- **POST** `/api/getmytimesheet` - Retrieve timesheets for a specific user.

### Admin Controls
- **POST** `/api/adminlogin` - Log in as an admin.
- **GET** `/api/getAllTimesheets` - Retrieve all timesheets.
- **POST** `/api/updateTimesheetStatus` - Update the status of a timesheet (e.g., approved, pending).

## Configuration

### Dependencies
Install project dependencies with:
```bash
npm install
```

### Scripts
- `npm start`: Starts the server on `http://localhost:5000/`.
- `npm run dev`: Starts the server in development mode.
- `npm run build`: Builds the project using Vite.

### Netlify Configuration
Ensure the `netlify.toml` file is present:
```toml
[build]
  command = "npm install vite && npm install && npm run build"
  publish = "public"
  functions = "functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Usage

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/lokeshvivek2511-timesheet-server-node.git
   ```
2. Navigate to the project directory:
   ```bash
   cd lokeshvivek2511-timesheet-server-node
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. The server will run at `http://localhost:5000/`.

### Deploying on Netlify
1. Ensure your repository is linked to Netlify.
2. Set the build command to `npm install vite && npm install && npm run build`.
3. Set the publish directory to `public` and functions folder to `functions`.

## Sample Data
### Admin Credentials
```json
[
    {
        "email": "admin@gmail.com",
        "password": "admin"
    }
]
```

### User Data
```json
[
  {
    "name": "lokesh",
    "email": "lokesh25@gmail.com",
    "password": "lokesh",
    "confirmPassword": "lokesh",
    "IsAccepted": true,
    "timestamp": "2024-11-13T10:58:55.444Z"
  }
]
```

### Timesheet Data
```json
[
  {
    "email": "123@gmail.com",
    "date": "14/11/2024",
    "timesheet": [
      {
        "startTime": "09:00",
        "finishTime": "09:03",
        "task": "aaa",
        "id": 1
      }
    ],
    "status": "approved"
  }
]
```

## Adding a Report PDF
To add your report PDF to the repository and include it in the README:
1. Place the PDF file (e.g., `report.pdf`) in the root directory.
2. Add the following link to the README:
 
   [Project Report](https://github.com/lokeshvivek2511/timesheet-client-react/blob/main/docs/Timesheet_Report.pdf)


## License
This project is licensed under the MIT License.

## Author
[Lokeshwaran V](https://github.com/lokeshvivek2511)

