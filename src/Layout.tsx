import { PropsWithChildren, useEffect } from 'react';
import { useAuthState } from './providers/AuthProvider/hooks';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthed } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed) {
      navigate('/login');
    }
  }, [isAuthed, navigate]);

  return (
    <>
      <Outlet />
      {children}
    </>
  );
}
