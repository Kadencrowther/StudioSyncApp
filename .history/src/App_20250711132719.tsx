import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Families from "./pages/Families";
import Instructors from "./pages/Instructors";
import Payments from "./pages/Payments";
import Store from "./pages/Store";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";

// New imports for added routes:
import ChargesPayments from "./pages/ChargesPayments";
import Revenue from "./pages/Revenue";
import TuitionRates from "./pages/TuitionRates";
import Fees from "./pages/Fees";
import Discounts from "./pages/Discounts";
import Credit from "./pages/Credit";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin/:studioId" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:studioId" element={<SignUp />} />

          {/* Protected Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* Base routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Existing routes */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute>
                  <Classes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="/families"
              element={
                <ProtectedRoute>
                  <Families />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructors"
              element={
                <ProtectedRoute>
                  <Instructors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store"
              element={
                <ProtectedRoute>
                  <Store />
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance"
              element={
                <ProtectedRoute>
                  <Performance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* New routes integrated here */}
            <Route
              path="/charges-payments"
              element={
                <ProtectedRoute>
                  <ChargesPayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/revenue"
              element={
                <ProtectedRoute>
                  <Revenue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tuition-rates"
              element={
                <ProtectedRoute>
                  <TuitionRates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fees"
              element={
                <ProtectedRoute>
                  <Fees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/discounts"
              element={
                <ProtectedRoute>
                  <Discounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/credit"
              element={
                <ProtectedRoute>
                  <Credit />
                </ProtectedRoute>
              }
            />

            {/* Routes with studio and user context (existing ones) */}
            <Route
              path="/:studioId/:userId"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* ... repeat for other routes with studioId/userId ... */}
            {/* For brevity, include your existing routes here exactly as before */}

            {/* Redirect from /charges-payments if you want */}
            {/* If you want / redirect to /charges-payments instead of Home, just change the '/' route above */}
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
