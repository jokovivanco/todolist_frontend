import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login, Dashboard, TaskList, Register } from './pages';
import RootLayout from './components/RootLayout';
import RequireAuth from './components/RequireAuth';
import useAuth from './hooks/useAuth';
import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import Account from './pages/Account';
import { useCallback, useEffect } from 'react';
import CheckIfLoggedIn from './components/CheckIfLoggedIn';

function App() {
  const { user, setUser, refresh } = useAuth();
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const response = await refresh();
      setUser(response!);
    } catch (error) {
      console.log(error);

      navigate('/login');
    }
  }, [navigate, refresh, setUser]);

  useEffect(() => {
    refreshToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* public routes */}
        <Route element={<CheckIfLoggedIn />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="register" element={<Register />} />

        {/* protected routes */}
        <Route element={<RequireAuth element={`Hi, ${user?.name}`} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route
          element={
            <RequireAuth
              element={
                <Link to="/" className="flex items-center gap-2">
                  <MoveLeft />
                  Dashboard
                </Link>
              }
            />
          }
        >
          <Route path="/todos/:todoId" element={<TaskList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
