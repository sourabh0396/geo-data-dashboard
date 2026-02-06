# Geo Dashboard

A full-stack web application for visualizing and managing geographic data with an interactive map and data table interface.

## 🌍 Overview

The Geo Dashboard allows users to:

- View geographic data points on an interactive map
- Search and filter data by project name and status
- Paginate through large datasets
- Select and highlight specific locations on both map and table

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **Ant Design** - UI component library
- **Leaflet** - Interactive maps
- **React Leaflet** - React integration for Leaflet

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/geodata
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or for production:
   npm start
   ```

The backend will be running at `http://localhost:5000`
and for live https://geo-data-dashboard.onrender.com/api/geodata

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running at `http://localhost:5173`
For live `https://geo-data-dashboard-fe.onrender.com/`

## 📡 API Documentation

### GET /api/geodata

Fetches paginated geographic data with optional search and status filtering.

**Query Parameters:**

- `search` (optional): Search term to filter by project name
- `status` (optional): Filter by status ("Active", "Inactive", "Completed")
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of records per page (default: 50)

**Example Request:**

```bash
GET /api/geodata?search=project&status=Active&page=1&limit=10
```

**Response:**

```json
{
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "projectName": "Sample Project",
      "latitude": 40.7128,
      "longitude": -74.006,
      "status": "Active",
      "lastUpdated": "2023-09-05T12:00:00.000Z",
      "createdAt": "2023-09-05T10:00:00.000Z",
      "updatedAt": "2023-09-05T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15
  }
}
```

## ⚙️ Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/geodata
PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Features

- **Interactive Map**: Visualize geographic data points using Leaflet
- **Data Table**: Sortable and paginated table with project information
- **Search**: Real-time search by project name
- **Status Filtering**: Filter data by Active, Inactive, or Completed status
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Synchronized selection between map and table

## 📝 Available Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Data Model

### GeoData Schema

```javascript
{
  projectName: String (required, indexed),
  latitude: Number (required),
  longitude: Number (required),
  status: String ("Active" | "Inactive" | "Completed", required),
  lastUpdated: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Verify your MongoDB URI is correct
   - Check if MongoDB is running (for local instances)
   - Ensure IP whitelist includes your development machine (for Atlas)

2. **CORS Errors**
   - Ensure backend CORS is properly configured
   - Check that frontend API URL matches backend port

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility

## 📜 License

This project is licensed under the ISC License.
