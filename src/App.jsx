import "./App.css";
import MainLayout from "./Layout/MainLayout";
import MainPage from "./components/mainPage/MainPage";
import NotePage from "./components/notePage/NotePage";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";

function App() {
      const routes = createBrowserRouter(
        createRoutesFromElements(
          <Route path='/' element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/note-page/:id" element={<NotePage />} />
          </Route>
        )
      );
      return (
        <>
          <RouterProvider router={routes} />
        </>
      );
    }

export default App;


