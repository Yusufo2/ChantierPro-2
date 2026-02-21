import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewReport from './pages/NewReport';
import ReportView from './pages/ReportView';

function ProtectedRoute() {
  const { user } = useApp();
  if (!user) return <Navigate to="/" replace />;
  return <Layout><Outlet /></Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewReport />} />
            <Route path="/report/:id" element={<ReportView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
