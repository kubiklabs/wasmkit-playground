import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import SideBar from "./components/layout/SideBar";
import Navbar from "./components/layout/Navbar";
import ContractDetails from "./pages/ContractDetails";
import QueryContract from "./pages/QueryContract";
import ExecuteContract from "./pages/ExecuteContract";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <SideBar />
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/:contractid/contracts"
              element={<ContractDetails />}
            />
            <Route path="/:contractid/Execute" element={<ExecuteContract />} />
            <Route path="/:contractid/Query" element={<QueryContract />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
