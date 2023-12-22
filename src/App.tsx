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
import ContractList from "./pages/ContractList";

function App() {
  useEffect(() => {
    appConstructor();
  }, []);
  window.addEventListener("keplr_keystorechange", () => {
    location.reload();
  });

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
              <Routes>
                <Route path="/" element={<ContractList />} />
                <Route
                  path="/:contractid/details"
                  element={<ContractDetails />}
                />
                <Route
                  path="/:contractid/execute"
                  element={<ExecuteContract />}
                />
                <Route path="/:contractid/query" element={<QueryContract />} />
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
