# Backend

## Technologies

- Node.js
- Typescript
- Express
- TypeORM

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=YOUR_MYSQL_USER
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=YOUR_MYSQL_DATABASE
PORT=3000
```

## Running the app

```bash
# Development
npm run dev
```

## API Endpoints

### ToDos

- `GET /tasks` - Get all ToDos created by the user
- `POST /tasks` - Create a new ToDo
- `PUT /tasks/:id` - Update a ToDo
- `PATCH /tasks/:id/status` - Update the status of a
- `DELETE /tasks/:id` - Delete a ToDo
