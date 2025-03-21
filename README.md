# PNG to SVG Converter

A full-stack web application that converts PNG images to scalable vector graphics (SVG) format.

## Overview

This project provides a user-friendly web interface to convert PNG images to SVG format. The application uses Potrace for tracing bitmap images and converting them to vector graphics.

## Features

- Simple and intuitive user interface
- Drag and drop file upload
- Instant PNG to SVG conversion
- Preview of converted SVG
- Option to view and copy SVG code
- Responsive design that works on desktop and mobile devices

## Tech Stack

### Frontend
- Angular 19
- Angular Material
- ngx-file-drop for drag-and-drop functionality
- TypeScript
- SCSS for styling

### Backend
- Node.js
- Express.js
- Multer for file uploads
- Potrace for PNG to SVG conversion
- Sharp and Jimp for image processing

## Project Structure

```
.
├── frontend/                 # Angular frontend application
│   ├── src/                  # Source files
│   │   ├── app/              # Application components
│   │   │   ├── features/     # Feature modules
│   │   │   │   └── file-upload/  # File upload component
│   │   │   ├── app.component.*   # Main app component
│   │   │   └── app.config.*      # Angular configuration
│   │   ├── index.html        # Main HTML file
│   │   └── main.ts           # Entry point
│   ├── package.json          # Frontend dependencies
│   └── angular.json          # Angular configuration
├── backend/                  # Node.js/Express backend
│   ├── server.js             # Express server implementation
│   ├── uploads/              # Directory for uploaded files
│   └── package.json          # Backend dependencies
└── .gitignore                # Git ignore file
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/PNGtoSVG.git
   cd PNGtoSVG
   ```

2. Set up the backend:
   ```
   cd backend
   npm install
   ```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```
   The server will run on http://localhost:3000

2. In a separate terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The Angular application will run on http://localhost:4200

3. Open your browser and navigate to http://localhost:4200

## How It Works

1. User uploads a PNG image through the web interface
2. The image is sent to the backend server
3. The server uses Potrace to trace the bitmap and convert it to SVG
4. The resulting SVG is sent back to the frontend
5. The frontend displays the SVG and provides options to view/copy the SVG code

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Potrace](https://github.com/tooolbox/node-potrace) - Used for bitmap to vector conversion
- [Angular](https://angular.io/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework 