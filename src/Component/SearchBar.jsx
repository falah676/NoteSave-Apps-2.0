import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { LocaleContext } from "../context/NoteContext";

const SearchBar = ({changeText, keyword, keywordChange}) => {
    const {Locale} = useContext(LocaleContext);
    return (
        <section className="search-section">
            <div className="container">
                <h2>{Locale === 'en' ? 'Notes' : 'Catatan'} {changeText}</h2>
                <input type="text" className="searchBar" id="searchBar" placeholder={Locale === 'en' ? 'Find Notes' : 'Cari Notes...'} value={keyword} onChange={(event) => keywordChange(event.target.value)}/>
            </div>
        </section>
    )
}
SearchBar.propTypes = {
    changeText:PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired
}

export default SearchBar;