# Learnato Hackathon — Discussion Forum Microservice

This is a simple and interactive discussion forum for learners and instructors. Users can ask questions, reply to posts, and upvote helpful content. The forum updates in real time and works smoothly on both desktop and mobile.  

It’s built using **React.js** for the frontend, **Node.js + Express** for the backend, and **in-memory arrays** for storing posts and replies. The project is containerized with Docker, so it’s easy to run locally or deploy in the cloud.

---

## Tech Stack Used

| Layer      | Technology                        |
|------------|----------------------------------|
| Frontend   | React.js, Tailwind CSS            |
| Backend    | Node.js, Express                  |
| Database   | In-memory Array                   |
| Real-time  | Socket.io (optional)              |
| Deployment | Docker                            |

---

## Features Implemented

- **Create Post:** Add a new question or topic (title + content).  
- **List Posts:** View all posts sorted by votes or date.  
- **View Post:** See post details and its replies.  
- **Add Reply:** Post a reply under a question.  
- **Upvote Post:** Increase vote count for a post.  
- **Responsive UI:** Works on desktop and mobile devices.  

---

## API Endpoints

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/posts`               | Create a new post                  |
| GET    | `/posts`               | Get all posts                      |
| GET    | `/posts/:id`           | Get a single post with replies     |
| POST   | `/posts/:id/reply`     | Add a reply to a post              |
| POST   | `/posts/:id/upvote`    | Upvote a post                      |

---

## Installation & Setup

### Backend
1. Go to the backend folder:  ```cd backend```
2. Install dependencies:  ```npm install```
3. Start the server:  ```npm run dev```
   Server runs on `http://localhost:5000`.

### Frontend

1. Go to the frontend folder:  ``` cd frontend```
2. Install dependencies:   ```npm install```
3. Start the app:   ```npm start```
   App runs on `http://localhost:3000`.

---

##  Docker Deployment

1. Build Docker image:   ``` docker build -t learnato-forum ```.
2. Run Docker container:  ``` docker run -p 3000:3000 -p 5000:5000 learnato-forum```
3. Open `http://localhost:3000` in your browser.

---

##  Project Structure

```
learnato-forum/
│
├── backend/            # Node.js + Express backend
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
├── frontend/           # React + Tailwind frontend
│   ├── components/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Dockerfile
└── README.md
```

---

## 📌 How to Use

1. Launch backend server (`localhost:5000`).
2. Launch frontend (`localhost:3000`).
3. Create posts, reply to questions, and upvote helpful discussions.
4. See live updates if Socket.io is enabled.

---

## 👥 Contribution

You can fork this repository, add features, or improve the UI. Pull requests are welcome!

---
