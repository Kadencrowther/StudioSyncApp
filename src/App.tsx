import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            {/* Base routes that will be redirected to include studio/user */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/classes" element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            } />
            <Route path="/families" element={
              <ProtectedRoute>
                <Families />
              </ProtectedRoute>
            } />
            <Route path="/instructors" element={
              <ProtectedRoute>
                <Instructors />
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            } />
            <Route path="/store" element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            } />
            <Route path="/performance" element={
              <ProtectedRoute>
                <Performance />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />

            {/* Routes with studio and user context */}
            <Route path="/:studioId/:userId" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/calendar/:studioId/:userId" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/classes/:studioId/:userId" element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            } />
            <Route path="/students/:studioId/:userId" element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            } />
            <Route path="/families/:studioId/:userId" element={
              <ProtectedRoute>
                <Families />
              </ProtectedRoute>
            } />
            <Route path="/instructors/:studioId/:userId" element={
              <ProtectedRoute>
                <Instructors />
              </ProtectedRoute>
            } />
            <Route path="/payments/:studioId/:userId" element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            } />
            <Route path="/store/:studioId/:userId" element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            } />
            <Route path="/performance/:studioId/:userId" element={
              <ProtectedRoute>
                <Performance />
              </ProtectedRoute>
            } />
            <Route path="/reports/:studioId/:userId" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/settings/:studioId/:userId" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
