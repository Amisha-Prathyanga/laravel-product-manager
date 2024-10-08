# Laravel Product Manager Backend

This is the backend for the product management application built with Laravel. It provides APIs for managing products, handling authentication using Laravel Sanctum, and storing product images.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Troubleshooting](#troubleshooting)
-   [Project Structure](#project-structure)

## Features

-   RESTful APIs for product management (CRUD operations)
-   Laravel Sanctum for authentication(token based authentication)
-   Image upload and storage functionality
-   Clear separation of frontend and backend
-   Search and Filter Product Functionality
-   Fully built with Laravel framework

## Installation

To get started with this project, follow these steps:

### Prerequisites

-   PHP (version 8.x or higher)
-   Composer
-   MySQL or another database
-   Node.js (for front-end if needed)

### Clone the Repository

```bash
git clone https://github.com/Amisha-Prathyanga/laravel-product-manager.git
```

### Navigate to the Project Directory

```bash
cd laravel-product-manager
```

### Install Dependencies

```bash
composer install
```

### Configure Environment

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Open the `.env` file and update the database configuration and other environment variables as needed.

### Generate Application Key

```bash
php artisan key:generate
```

### Migrate the Database

```bash
php artisan migrate
```

### Storage Link for Image Uploads

```bash
php artisan storage:link
```

## Usage

### Start the Development Server

To start the backend server, use the following command:

```bash
php artisan serve
```

The server will be accessible at `http://localhost:8000`.

### Running the Frontend with the Backend

Make sure your frontend is running (built with React or Vite) and access the API through the backend server running on `http://localhost:8000`.

## API Endpoints

Here's a basic overview of the API routes provided by this backend:

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/products`      | Fetch all products         |
| POST   | `/api/products`      | Create a new product       |
| GET    | `/api/products/{id}` | Fetch a single product     |
| PUT    | `/api/products/{id}` | Update product information |
| DELETE | `/api/products/{id}` | Delete a product           |

For protected routes, include the Sanctum token in the authorization header as a Bearer token.

## Troubleshooting

### If Server Errors Occur

If you're encountering errors while running the server, try clearing configuration and cache:

```bash
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

### If Images Are Not Displayed

If your product images are not showing up, try the following steps to reset the symbolic link for storage:

```bash
rmdir public/storage
php artisan storage:link
```

This will recreate the symbolic link to ensure that the storage path for images is correct.

## Project Structure

```bash
├── app/                # Application logic (Controllers, Models, etc.)
├── config/             # Configuration files
├── database/           # Migrations and seeds
├── public/             # Public directory (entry point, assets)
├── routes/             # API routes defined here
├── storage/            # Uploaded images and Laravel storage
├── .env.example        # Example environment file
├── composer.json       # Composer dependencies and scripts
├── README.md           # This README file
└── artisan             # Artisan CLI for Laravel
```
