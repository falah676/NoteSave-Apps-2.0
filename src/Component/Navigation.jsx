import React from "react";
import { Link } from "react-router-dom";
import {BiLogOut} from 'react-icons/bi'
import {BsFillSunFill, BsMoonFill, BsTranslate} from 'react-icons/bs'
import PropTypes from 'prop-types'
import {LocaleContext, ThemeContext} from "../context/NoteContext";
import { useContext } from "react";


const Navigation = ({Logout, user}) => {
    const {Theme, toggleTheme} = useContext(ThemeContext);
    const {Locale, toggleLocale} = useContext(LocaleContext);
    return (
        <nav>
            <ul className="navbar">
                <li><Link to={'/archive'}>{Locale === 'en' ? 'Archive' : 'Arsip'}</Link></li>
                <li><button onClick={toggleLocale} title={Locale === 'en' ? 'Translate' : 'Terjemahkan'}><BsTranslate size={30}/></button></li>
                <li>
                <button onClick={toggleTheme} title={Locale === 'en' ? (Theme === 'light' ? 'Dark Mode' : 'Light Mode') : (Theme === 'light' ? 'Mode Gelap' : 'Mode Cerah')}>
                  {Theme === 'light' ? <BsMoonFill size={30} /> : <BsFillSunFill size={30} />}
                </button>
              </li>
              <li><button onClick={Logout} title={Locale === 'en' ? 'Log Out' : 'Keluar'}>{user} <BiLogOut size={30}/></button></li>
            </ul>
        </nav>
    )
}
Navigation.propTypes = {
    user:PropTypes.string.isRequired,
    Logout: PropTypes.func.isRequired
}
export default Navigation