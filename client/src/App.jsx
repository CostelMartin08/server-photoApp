import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import HomePage from "./pages/HomePage";
import PhotoEvents from './pages/PhotoEventsPage';
import VideoDetails from "./pages/VideoEventsPage";
import AlbumDetails from "./pages/AlbumDetailsPage";
import ControlPanel from './pages/ControlPanelPage';
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PageNotFound from "./pages/NotFoundPage";
import { urlBase } from "./scripts/url";
import { ThemeProvider } from "./scripts/useTheme";

const App = () => {

  const [connection, setConnection] = useState(false);
  const [data, setdata] = useState([]);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('status')) === true;
    setConnection(isLoggedIn);
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const login = () => {
    setConnection(true);
  }
  const logout = () => {
    setToken(null);
    setConnection(false);
    localStorage.removeItem('status');
    localStorage.removeItem('token');
  };

  const getData = async (parametruURL) => {
    try {
      const response = await fetch(`${urlBase}/galerie/${parametruURL}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Ceva nu a mers bine!');
      }
      const data = await response.json();
      setdata(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login connection={login} setToken={setToken} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<HomePage disconnection={logout} status={connection} loadingData={getData} sendData={data} />} />
          <Route path='portofoliuFoto/:category/:title' element={<AlbumDetails loadingData={getData} sendData={data} />} />
          <Route path='/controlPanel' element={connection ? (<ControlPanel status={connection} disconnection={logout} />) : (<PageNotFound />)} />
          <Route path='portofoliuFoto/:category' element={<PhotoEvents loadingData={getData} sendData={data} status={connection} logout={logout} />} />
          <Route path='/portofoliuVideo' element={<VideoDetails status={connection} logout={logout} />} />
          <Route path='/despreMine' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/notFound' element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;