# Instamedirx API

## Cloning the Repository

```bash
git clone https://github.com/Instamedirx/instamedirx-backend.git
cd instamedirx-backend
```

## Installation

Install the project dependencies:

```bash
npm install
```

## Environment Configuration

1. Create a `.env` file in the root directory of the project
2. Copy the contents from the `.env.example` file (if available)
3. Fill in the necessary environment variables

Example `.env` file:
```
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```


## Running the Application

### Development Mode

To start the server in development mode:

```bash
npm run dev
```

### Production Mode

To start the server in production mode:

```bash
npm start
```

## Swagger Documentation

Once the server is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api-docs
```

### Viewing API Endpoints

- Open your web browser
- Navigate to the Swagger documentation URL
- Browse through available endpoints
- Test API calls directly from the Swagger interface
