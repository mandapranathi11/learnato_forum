import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
