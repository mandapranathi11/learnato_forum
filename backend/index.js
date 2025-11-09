const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./db");


db.init();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());


io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);
});


app.post("/posts", (req, res) => {
  const post = db.createPost(req.body);
  io.emit("new_post", post);
  res.json(post);
});

app.get("/posts", (req, res) => {
  const posts = db.listPosts();
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = db.getPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.post("/posts/:id/reply", (req, res) => {
  db.addReply(req.params.id, req.body);
  io.emit("new_reply", { postId: req.params.id });
  res.json({ success: true });
});

app.post("/posts/:id/upvote", (req, res) => {
  db.upvotePost(req.params.id);
  io.emit("upvote", { postId: req.params.id });
  res.json({ success: true });
});


app.get("/", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

const PORT = 4000;
server.listen(PORT, () =>
  console.log(`✅ Backend server running on http://localhost:${PORT}`)
);
