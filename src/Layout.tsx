import { PropsWithChildren, useEffect } from 'react';
import { useAuthState } from './providers/AuthProvider/hooks';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthed, loading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed && !loading) {
      navigate('/login')
    }
  }, [isAuthed, loading, navigate])

  return (
    <>
      <Outlet />
      {children}
    </>
  );
}
