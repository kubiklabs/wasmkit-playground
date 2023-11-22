import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <SideBar />
        <div className="App">
          Body
          <Routes>
            <Route />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
