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
  VoiceNotePage,
} from "./pages";
import NotFound from "./pages/Error/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notes" element={<PageLayout />}>
          <Route index element={<Note />} />
          <Route path="create" element={<AddNote />} />
          <Route path=":id" element={<EditNote />} />
        </Route>
        <Route path="voice-notes" element={<PageLayout />}>
          <Route index element={<VoiceNotePage />} />
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
