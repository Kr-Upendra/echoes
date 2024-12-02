import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { PageLayout, ProtectedLayout, RootLayout } from "./layouts";
import {
  AddJournal,
  AddNote,
  Dashboard,
  EditJournal,
  EditNote,
  Home,
  Journal,
  Login,
  Note,
  NotFound,
  Profile,
  Register,
} from "./pages";
import { journalsLoader, statLoader } from "./utils";
import Error from "./components/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} loader={statLoader} />
        <Route path="profile" element={<Profile />} loader={statLoader} />
        <Route path="memories" element={<PageLayout />}>
          <Route index element={<Note />} />
          <Route path="create" element={<AddNote />} />
          <Route path=":id" element={<EditNote />} />
        </Route>
        <Route
          path="journals"
          element={<PageLayout />}
          errorElement={
            <Error error={{ error: { message: "Some error occurred!" } }} />
          }
        >
          <Route index element={<Journal />} loader={journalsLoader} />
          <Route path="create" element={<AddJournal />} />
          <Route path=":id" element={<EditJournal />} />
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
