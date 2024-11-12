import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from './App';
import { SignInPage } from './pages/signIn';
import { RegisterPage } from './pages/register';
import { ErrorComponent } from './components/error';
import { ImageDetail } from './components/photos/imageDetail';
import { AuthProvider } from './context/authProvider';
import { ProfilePage } from './pages/profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/signIn",
    element: <SignInPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/home",
    element: <App />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/img-detail/:id",
    element: <ImageDetail />,
    errorElement: <ErrorComponent />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
