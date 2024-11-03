import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { PageLayout, ProtectedLayout, RootLayout } from "./layouts";
import {
  AddNote,
  Dashboard,
  EditNote,
  Home,
  Login,
  Note,
  Profile,
  Register,
} from "./pages";
import NotFound from "./pages/Error/NotFound";
import { statLoader } from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} loader={statLoader} />
        <Route path="profile" element={<Profile />} />
        <Route path="memories" element={<PageLayout />}>
          <Route index element={<Note />} />
          <Route path="create" element={<AddNote />} />
          <Route path=":id" element={<EditNote />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
