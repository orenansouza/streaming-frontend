import { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/Login';
import Upload from './pages/Upload';
import Streams from './pages/Streams';
import { useAuthStore } from './store/auth';
import Register from './pages/Register';

function PrivateRoute({ children }: { children: ReactNode }): ReactElement | null {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Streams />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
      <Route path="/register" element={<Register />} />
      <Route path="/streams" element={<Streams />} />

      </Routes>
    </BrowserRouter>
  );
}
