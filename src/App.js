import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import ManageCategories from './components/ManageCategories';
import Page404 from './components/404Page';
import Home from './components/Home';
import Root from './components/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/tasks",
        element: <Tasks />
      },
      {
        path: "/add-task",
        element: <AddTask />
      },
      {
        path: "/manage-categories",
        element: <ManageCategories />
      },
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
