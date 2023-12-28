import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Common/Navbar";
import Login from "./Components/Core/Login";
import OpenRoute from "./Components/Common/OpenRoute";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import Dashboard from "./Components/Core/Dashboard";
import GenerateReport from "./Components/Core/Op1Dashboard/GenerateReport";
import LogRegisterForm from "./Components/Core/Op1Dashboard/LogRegisterForm"
import ItemsRegisterForm from "./Components/Core/Op1Dashboard/ItemsRegisterForm";
import IntermediatePage from "./Components/Core/Op1Dashboard/IntermediatePage";
import HeatRegisterForm from "./Components/Core/Op1Dashboard/HeatRegisterForm";
import EditPage from "./Components/Core/Op1Dashboard/EditPage";
import EditItemsPage from "./Components/Core/Op1Dashboard/EditItemsPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="registerHeat"
          element={
            <ProtectedRoute>
              <HeatRegisterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="registerLog"
          element={
            <ProtectedRoute>
              <LogRegisterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="registerItem"
          element={
            <ProtectedRoute>
              <ItemsRegisterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="intermediatePage"
          element={
            <ProtectedRoute>
              <IntermediatePage />
            </ProtectedRoute>
          } />
        <Route
          path="generateReport"
          element={
            <ProtectedRoute>
              <GenerateReport />
            </ProtectedRoute>
          } />
          <Route
          path="editHeat"
          element={
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          } />
          <Route
          path="editItem"
          element={
            <ProtectedRoute>
              <EditItemsPage />
            </ProtectedRoute>
          } />
      </Routes>
      




    </div>
  );
}

export default App;
