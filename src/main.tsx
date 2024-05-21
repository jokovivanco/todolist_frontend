import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import UserProvider from './context/userContext.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </UserProvider>
    <Toaster />
  </BrowserRouter>,
  // </React.StrictMode>,
);
