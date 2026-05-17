import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FAQs from "./components/FAQs";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SubmissionPage from "./pages/SubmissionPage";
import EvaluationPanel from "./pages/EvaluationPanel";
import PrivateRoute from "./components/PrivateRoute";
import AdminSetWindow from "./pages/AdminSetWindow";
import EvaluationSummary from "./pages/EvaluationSummary";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/faqs" element={<FAQs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["participant", "admin", "judge"]}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/submission"
          element={
            <PrivateRoute roles={["participant"]}>
              <SubmissionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/evaluation"
          element={
            <PrivateRoute roles={["judge"]}>
              <EvaluationPanel />
            </PrivateRoute>
          }
        />
      
        <Route
          path="/evaluation-summary"
          element={
              <EvaluationSummary />
          }
        />
        <Route
          path="/set-submission-window"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminSetWindow />
            </PrivateRoute>
          }
        />
      </Routes>
    
  );
}

export default App;
