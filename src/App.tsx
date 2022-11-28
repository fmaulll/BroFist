import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import PickFight from "./containers/PickFight";
import Register from "./containers/Register";
import Container from "./layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fight" element={<PickFight />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
