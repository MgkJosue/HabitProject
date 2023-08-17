import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  // Si el token y el ID del usuario están presentes, se renderiza el contenido protegido
  if (token && userId) {
    return <Outlet />;
  }

  // De lo contrario, se redirige al usuario a la página de inicio de sesión
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
