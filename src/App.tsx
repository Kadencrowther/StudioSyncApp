import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
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

          {/* Other protected routes */}
          <Route path="/profile/:studioId/:userId" element={
            <ProtectedRoute>
              <UserProfiles />
            </ProtectedRoute>
          } />
          <Route path="/form-elements/:studioId/:userId" element={
            <ProtectedRoute>
              <FormElements />
            </ProtectedRoute>
          } />
          <Route path="/basic-tables/:studioId/:userId" element={
            <ProtectedRoute>
              <BasicTables />
            </ProtectedRoute>
          } />
          <Route path="/alerts/:studioId/:userId" element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          } />
          <Route path="/avatars/:studioId/:userId" element={
            <ProtectedRoute>
              <Avatars />
            </ProtectedRoute>
          } />
          <Route path="/badge/:studioId/:userId" element={
            <ProtectedRoute>
              <Badges />
            </ProtectedRoute>
          } />
          <Route path="/buttons/:studioId/:userId" element={
            <ProtectedRoute>
              <Buttons />
            </ProtectedRoute>
          } />
          <Route path="/images/:studioId/:userId" element={
            <ProtectedRoute>
              <Images />
            </ProtectedRoute>
          } />
          <Route path="/videos/:studioId/:userId" element={
            <ProtectedRoute>
              <Videos />
            </ProtectedRoute>
          } />
          <Route path="/line-chart/:studioId/:userId" element={
            <ProtectedRoute>
              <LineChart />
            </ProtectedRoute>
          } />
          <Route path="/bar-chart/:studioId/:userId" element={
            <ProtectedRoute>
              <BarChart />
            </ProtectedRoute>
          } />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
