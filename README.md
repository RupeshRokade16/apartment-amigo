# Apartment Amigo

Welcome to **Apartment Amigo**, a collaborative household management platform built with the MERN stack. Apartment Amigo aims to simplify the coordination of household activities, fostering a harmonious living environment for roommates.

## Pages

### User Dashboard

- **Chore Charts:** Keep all roommates accountable with a collaborative chore chart.
- **Shopping List:** Facilitate timely grocery and item purchases with a shared shopping list.
- **Document Sharing:** Centralize household-related documents, such as leases, in one accessible location.

### Profile Page

- **Member Overview:** View all household members.
- **Personalization:** Change your username and email.
- **Household Switching:** Easily switch between households.

### Admin Panel

- **Admin Access:** Special access through the /adminLogin page.
- **Dashboard:** Overview of total users and households.
- **Household Management:** Find, view, and delete members within a household.

## Features

### User Session

- **JWT Token:** Secure session management using JSON Web Tokens.
- **Token Verification:** Ensure token presence for protected routes.
- **Constant Check:** Redirect unauthorized attempts to login, enhancing security.

### Security

- **Password Storage:** Securely store passwords using bcrypt.

### API

- **Node.js:** JavaScript runtime for building server-side applications.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt:** Library for hashing passwords.
- **jsonwebtoken:** Generate JSON Web Tokens (JWT) for secure session management.
- **axios:** Promise-based HTTP client for making requests.
- **cors:** Middleware for handling Cross-Origin Resource Sharing.

### External Email APIs

- **@elasticemail/elasticemail-client**
- **axios** (used for external API requests)
- **postmark**
- **sendinblue-api**

### Schema

- **Complex Structure:** Interconnected models for logical data flow.

### Styling

- **Bootstrap and CSS:** Stylish and responsive design for a seamless user experience.

### Environment Variables

- **configure.env:** Store port information and confidential MongoDB access data.

## Installation

1. Clone the repository: `git clone https://github.com/RupeshRokade16/apartment-amigo.git'
2. Navigate to the project folder: `cd apartment-amigo`
3. Install dependencies: `npm install`
4. Set up environment variables in configure.env.

## Usage

1. Start the server: `npm start`
2. Access the application at [http://localhost:yourport](http://localhost:yourport)

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Make your changes and commit them.
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.

## License

This project is created only for educational purposes

Thank you for choosing Apartment Amigo! We hope it enhances your household management experience.
