const Database = require("better-sqlite3");

const db = new Database("forum.db");

function init() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      answered INTEGER DEFAULT 0,
      author TEXT DEFAULT 'Anonymous'
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      author TEXT DEFAULT 'Anonymous',
      FOREIGN KEY(post_id) REFERENCES posts(id)
    )
  `).run();
}

function createPost({ title, content, author }) {
  const stmt = db.prepare(
    `INSERT INTO posts (title, content, author) VALUES (?, ?, ?)`
  );
  const info = stmt.run(title, content, author || "Anonymous");
  return getPost(info.lastInsertRowid);
}

function listPosts() {
  return db
    .prepare(`SELECT * FROM posts ORDER BY votes DESC, created_at DESC`)
    .all();
}

function getPost(id) {
  const post = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
  if (!post) return null;

  const replies = db
    .prepare(`SELECT * FROM replies WHERE post_id = ? ORDER BY created_at`)
    .all(id);

  return { ...post, replies };
}

function addReply(postId, { content, author }) {
  db.prepare(
    `INSERT INTO replies (post_id, content, author) VALUES (?, ?, ?)`
  ).run(postId, content, author || "Anonymous");
}

function upvotePost(id) {
  db.prepare(`UPDATE posts SET votes = votes + 1 WHERE id = ?`).run(id);
}

module.exports = {
  init,
  createPost,
  listPosts,
  getPost,
  addReply,
  upvotePost,
};
