import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { PageLayout, RootLayout } from "./layouts";
import {
  AddNote,
  Dashboard,
  EditNote,
  Home,
  Login,
  Note,
  Profile,
  Register,
  Reminder,
  Setting,
} from "./pages";
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
      <Route path="notes" element={<PageLayout />}>
        <Route index element={<Note />} />
        <Route path="create" element={<AddNote />} />
        <Route path=":id" element={<EditNote />} />
      </Route>
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
