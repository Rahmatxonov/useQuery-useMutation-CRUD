import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, AddTodo, SingleTodo } from "./pages";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/update/:id" element={<AddTodo />} />
      <Route path="/single/:id" element={<SingleTodo />} />
    </Routes>
  );
}

export default App;
