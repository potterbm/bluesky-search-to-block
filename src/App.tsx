import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Login from './pages/Login';
import Search from './pages/Search';
import AuthProvider from './providers/AuthProvider/AuthProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

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
        path: '',
        element: <Search />,
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
