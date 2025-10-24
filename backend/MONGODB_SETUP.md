# MongoDB Setup and Connection Guide

## Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account

## Option 1: Local MongoDB Installation

### Windows Installation Steps:

1. **Download MongoDB Community Server**
   - Go to https://www.mongodb.com/try/download/community
   - Select "Windows" and download the MSI installer

2. **Install MongoDB**
   - Run the downloaded MSI file
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service
   - Install MongoDB Compass (optional GUI tool)

3. **Start MongoDB Service**
   - MongoDB should start automatically as a Windows service
   - You can also start it manually from Services (services.msc)
   - Or use command: `net start MongoDB`

4. **Verify Installation**
   - Open Command Prompt or PowerShell
   - Run: `mongod --version`
   - Run: `mongo --version` (or `mongosh --version` for newer versions)

### Alternative: Using MongoDB via Docker
```bash
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo

# To stop: docker stop mongodb
# To start: docker start mongodb
```

## Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region
   - Name your cluster

3. **Configure Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set permissions to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add your current IP or use "0.0.0.0/0" for all IPs (less secure)

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

## Environment Configuration

### For Local MongoDB:
Your `.env` file should contain:
```
MONGO_URI=mongodb://localhost:27017/RESERVATIONS
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### For MongoDB Atlas:
Replace the MONGO_URI in your `.env` file with:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/RESERVATIONS?retryWrites=true&w=majority
```

## Testing the Connection

1. **Start your backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check the console output:**
   - You should see: "Connected to database!"
   - If you see an error, check your MongoDB connection

3. **Test with MongoDB Compass (if installed locally):**
   - Connect to: `mongodb://localhost:27017`
   - You should see the "RESERVATIONS" database

## Troubleshooting

### Common Issues:

1. **"Cannot connect to MongoDB"**
   - Ensure MongoDB service is running
   - Check if port 27017 is available
   - Verify the connection string

2. **"Authentication failed"**
   - Check username/password in connection string
   - Ensure user has proper permissions

3. **"Network timeout"**
   - Check firewall settings
   - Verify network access in MongoDB Atlas

### Useful Commands:

```bash
# Check if MongoDB is running
netstat -an | findstr 27017

# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Connect to MongoDB shell
mongosh
```

## Database Structure

Your application will create a database called "RESERVATIONS" with collections for:
- Reservations (based on your reservation model)

## Next Steps

1. Ensure MongoDB is running
2. Start your backend server: `npm run dev`
3. Test the reservation API endpoints
4. Check MongoDB Compass or Atlas to see your data

## Security Notes

- Never commit your `.env` file to version control
- Use strong passwords for database users
- Restrict network access in production
- Consider using environment-specific configurations
