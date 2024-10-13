import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/settings/Setting";
import Profile from "./pages/profile/Profile";
import Note from "./pages/Note";
import Reminder from "./pages/Reminder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="settings" element={<Setting />} />
      <Route path="profile" element={<Profile />} />
      <Route path="notes" element={<Note />} />
      <Route path="reminders" element={<Reminder />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
