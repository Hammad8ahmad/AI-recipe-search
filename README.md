
##  AI Recipe Search https://ai-recipe-search.vercel.app/
An AI-powered recipe search application that allows users to discover delicious recipes based on their input. Built with a React frontend,Postgres db and an Express.js backend, and powered by the Edamam API for recipe data. 

##  Features
-  Recipe Search: Search for recipes using the Edamam API.
-  Save & Delete Recipes: Add favorite recipes to a list and remove them as needed.
-  Responsive Design: Fully responsive layout using Tailwind CSS.
-  Real-time Deployment:
  - Backend is deployed on DigitalOcean using Docker.
  - Frontend is deployed on Vercel with automatic deployments from GitHub.
-  API Integration: Edamam API for recipe data and PostgreSQL for storage.
##  Tech Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Express.js, Node.js
- Database: PostgreSQL (Dockerized)
- Deployment: DigitalOcean (Backend), Vercel (Frontend)
- API: Edamam API (for recipes)
- Docker: Docker & Docker Compose for container orchestration
- CI/CD: GitHub Actions
##  Project Structure
```bash
├── client/                  # React frontend (Vercel deployment)
│   ├── public/
│   ├── src/
│   ├── .env                 # Client environment variables (ignored in .gitignore)
│   ├── package.json
│   └── ...
├── server/                  # Express.js backend (DigitalOcean deployment)
│   ├── db/                  # PostgreSQL setup
│   ├── routes/              # API routes
│   ├── .env                 # Server environment variables (ignored in .gitignore)
│   ├── Dockerfile           # Backend Dockerfile
│   ├── package.json
│   └── ...
├── docker-compose.yml       # Docker Compose setup (PostgreSQL, server)
├── .github/
│   └── workflows/           # GitHub Actions for CI/CD
├── README.md
└── ...
```
##  Environment Variables
You need to set up the following environment variables for both the server and client:

###  Server (server/.env)
Create a .env file in the server directory:
```bash
# Production Environment
GITHUB_TOKEN=your_github_token
PORT=3000
NODE_ENV=production

# Edamam API keys
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key

# Database configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Production Environment
GITHUB_TOKEN=your_github_token
PORT=3000
NODE_ENV=production

# Edamam API keys
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key

# Database configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```
 Client (client/.env)
Create a .env file in the client directory:
```bash
# API URLs
VITE_DEV_URL=http://localhost:3000
VITE_PROD_URL=https://your-deployed-backend-url

# API URLs
VITE_DEV_URL=http://localhost:3000
VITE_PROD_URL=https://your-deployed-backend-url
```
- VITE_DEV_URL: Used for development to connect to the backend running locally.
- VITE_PROD_URL: Used in production to connect to the deployed backend.
⚠️ **Important**: Ensure your .env files are listed in .gitignore to prevent them from being pushed to GitHub.

##  Running the Project
### 1 Clone the Repository
```bash
git clone https://github.com/yourusername/ai-recipe-search.git
cd ai-recipe-search
```
### 2 Set up Environment Variables
Create .env files for both server and client following the formats mentioned above.

### 3 Run Docker Compose (for Backend + PostgreSQL)
Ensure Docker is running, then start the services:
```bash
docker compose up --build
```
### 4 Run the Client (Frontend)
Navigate to the client folder:

```bash
cd client
```
For development (with live reload):
```bash
npm run dev
```
For production (build the client):
```bash
npm run build
```
### 5 Access the Application
- Frontend: http://localhost:5173 (default Vite port)
- Backend API: http://localhost:3000
##  Deployment
###  Backend (DigitalOcean)
The backend is automatically deployed using GitHub Actions.
Workflow:
- Push changes to the master branch.
- GitHub Actions will:
    - SSH into your DigitalOcean droplet.
    - Pull the latest changes.
    - Rebuild and restart Docker containers.
- The updated backend will be live at:
```bash
https://your-digitalocean-droplet-ip:3000
```
###  Frontend (Vercel)
The client is deployed on Vercel.
Workflow:

- Push changes to the master branch.
- Vercel will automatically:
    - Pull the latest changes.
    - Build the frontend.
    - Deploy to your Vercel-provided URL:
```bash
https://your-project-name.vercel.app
```
- Make sure your client uses the correct VITE_PROD_URL for API requests.
##  CI/CD Workflow
The CI/CD pipeline uses GitHub Actions:

- **Backend Deployment:**
  Triggered when you push to the master branch.Runs the deployment workflow, pulling the latest code and restarting Docker containers on DigitalOcean.
- **Frontend Deployment:**
  Handled by Vercel, automatically deploying changes from the master branch.



 

