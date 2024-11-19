import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Login from './pages/Login';
import LoginCallback from './pages/LoginCallback';
import Search from './pages/Search';
import AuthProvider from './providers/AuthProvider';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    // loader: rootLoader,
    children: [
      {
        path: 'login',
        element: <Login />,
        // loader: teamLoader,
      },
      {
        path: 'login/callback',
        element: <LoginCallback />,
      },
      {
        path: '',
        element: <Search />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
