import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { RootLayout } from "./layouts";
import {
  Dashboard,
  Home,
  Login,
  Profile,
  Register,
  Reminder,
  Setting,
} from "./pages";
import Note from "./pages/Note";
import NotFound from "./pages/Error/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route element={<ProtectedLayout isAuthenticated={false} />}> */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="settings" element={<Setting />} />
      <Route path="profile" element={<Profile />} />
      <Route path="notes" element={<Note />} />
      <Route path="reminders" element={<Reminder />} />
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
