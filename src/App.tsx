import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
