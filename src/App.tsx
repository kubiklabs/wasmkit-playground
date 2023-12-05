import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import SideBar from "./components/layout/SideBar";
import Navbar from "./components/layout/Navbar";
import ContractDetails from "./pages/ContractDetails";
import QueryContract from "./pages/QueryContract";
import ExecuteContract from "./pages/ExecuteContract";
import NavbarContainer from "./components/navbar-components/NavbarContainer";
import { useNetworkConfig } from "./hooks/useNetworkConfig";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    appConstructor();
  }, []);

  const { setNetworkContractsConfig } = useNetworkConfig();

  const appConstructor = () => {
    setNetworkContractsConfig();
  };

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <SideBar />
          <div className="App">
            <NavbarContainer />
            <Stack height={"100%"} overflowY={"auto"}>
              <Navbar />
              <Routes>
                <Route
                  path="/:contractid/contracts"
                  element={<ContractDetails />}
                />
                <Route
                  path="/:contractid/Execute"
                  element={<ExecuteContract />}
                />
                <Route path="/:contractid/Query" element={<QueryContract />} />
              </Routes>
            </Stack>
          </div>
        </BrowserRouter>
      </ChakraProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ textAlign: "left" }}
      />
    </>
  );
}

export default App;
