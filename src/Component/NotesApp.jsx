import React from "react";
import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddNotes from "../pages/AddNotes";
import ArchiveWrapper from "../pages/Arcvhive";
import DetailPage from "../pages/DetailPage";
import HomeWrapper from "../pages/Home";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/network-data";
import RegisterPage from "../pages/RegisterPage";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { BsFillSunFill, BsMoonFill, BsTranslate } from "react-icons/bs";
import { LocaleProvider, ThemeProvider } from "../context/NoteContext";
import { useMemo } from "react";
import LoadingBar from "./LoadingBar";

const NotesApp = () => {
  const [Theme, setTheme] = useState(localStorage.getItem('Theme') || 'dark');
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light'
    })
  }
  const ThemeContextValue = useMemo(() => {
    return {
      Theme,
      toggleTheme
    }
  }, [Theme])

  // false = id true = eng
  const [Locale, setLocale] = useState(localStorage.getItem('Locale') || 'en')
  const toggleLocale = () => {
    setLocale((prevLocale) => {
      return prevLocale === 'en' ? 'id' : 'en'
    },
    )
  }
  const LocaleContextValue = useMemo(() => {
    return {
      Locale,
      toggleLocale
    }
  })
  useEffect(() => {
    localStorage.setItem('Locale', Locale)
  }, [Locale])
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', Theme);
    localStorage.setItem('Theme', Theme);
  }, [Theme])
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing,setInitializing] = useState(true);
    const navigate = useNavigate();
    const onLoginSuccess = async ({accessToken}) => {
      putAccessToken(accessToken)
      const {data} = await getUserLogged()
      setAuthedUser(data);
    }
    useEffect(() => {
      const fetchGetUserLogged = async () => {
        const { error, data } = await getUserLogged();
        if (error) {
          setInitializing(false);
        } else {
          setAuthedUser(data);
          setInitializing(false);
        }
      };
      fetchGetUserLogged();
    }, []);
    const onLogOut = () => {
      setAuthedUser(null);
      putAccessToken('');
      navigate('/')
    }
    if (initializing) {
      return <ThemeProvider value={ThemeContextValue}>
        <LoadingBar />
        </ThemeProvider>
    }
    if (authedUser === null) {
      return(
        <LocaleProvider value={LocaleContextValue}>
        <ThemeProvider value={ThemeContextValue}>
        <div className="notes-apps">
          <header className="header">
            <h2><Link to={'/'}>NoteSave</Link></h2>
            <nav>
              <ul>
              <li><button onClick={toggleLocale} title={Locale === 'en'? 'Translate' : 'Terjemahkan'}><BsTranslate size={30}/></button></li>
              <li>
                <button onClick={toggleTheme} title={Locale === 'en'? (Theme === 'light' ? 'Dark Mode' : 'Light Mode') : (Theme === 'light' ? 'Mode Gelap' : 'Mode Cerah')}>
                  {Theme === 'light' ? <BsMoonFill size={30} /> : <BsFillSunFill size={30} />}
                </button>
              </li>
              </ul>
            </nav>
          </header>
        <Routes>
          <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess}/>} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </div>
        </ThemeProvider>
        </LocaleProvider>
        ) 
    }
    return (
      <LocaleProvider value={LocaleContextValue}>
      <ThemeProvider value={ThemeContextValue}>
      <div className="notes-apps">
        <header className="header">
          <h2><Link to={'/'}>NoteSave</Link></h2>
          <Navigation Logout={onLogOut} user={authedUser.name}/>
        </header>
        <Routes>
          <Route path='/' element={<HomeWrapper/>}/>
          <Route path='/archive' element={<ArchiveWrapper />}/>
          <Route path='/note/:id' element={<DetailPage />}/>
          <Route path='/AddNotes' element={<AddNotes />}/>
          <Route path='/*' element={<NotFound />}/>
        </Routes>
      </div>
      </ThemeProvider>
      </LocaleProvider>
    )
}
export default NotesApp;