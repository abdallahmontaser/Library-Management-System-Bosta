                                        Setting Up the Application

1. Install Dependencies:
    • Ensure you have Node.js installed on your system.
    • Run `npm install` to install all dependencies mentioned in your package.json file.

2. Database Configuration:
    • Set up your MySQL database and configure the connection details in a .env file. Ensure you have the   necessary permissions.
    • Populate the .env file with the following variables:
                PORT=your_port
                DB_USER=your_database_username
                DB_PASSWORD=your_database_password
                DB_HOST=your_database_host
                DB_PORT=your_database_port
                DB_NAME=name_database_you_want

3. Prisma Setup:
    • Run `npx prisma generate` to generate Prisma client code.
    • Run `npx prisma migrate deploy` to apply migrations and create database tables.

4. Start the Server:
    • Run `npm start` to start the Express server.