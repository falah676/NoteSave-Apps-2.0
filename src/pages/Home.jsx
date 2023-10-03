import React, { useContext } from "react";
import CardList from "../Component/CardList";
import SearchBar from "../Component/SearchBar";
import { FloatingButton } from "../Component/FloatingButton";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getActiveNotes } from "../utils/network-data";
import { LocaleContext, ThemeContext } from "../context/NoteContext";
import LoadingBar from "../Component/LoadingBar";

const HomeWrapper = () => {
    const {Theme} = useContext(ThemeContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const {Locale} = useContext(LocaleContext);
    const keyword = searchParams.get('keyword')
    const changeSearch = (keyword) => {
        setSearchParams({ keyword })
    }
    return <Home theme={Theme} Locale={Locale} defaultKeyword={keyword} keywordChangeHandler={changeSearch} />
}

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            keyword:props.defaultKeyword || '',
            Notes : [],
            isLoading: true
        }
        this.onChangeKeyword = this.onChangeKeyword.bind(this)
    }
    async onUpdateState(){

        const {data} = await getActiveNotes();
        this.setState (() => {
            return{
                Notes: data,
            }
        })
    }
   async componentDidMount(){
        this.onUpdateState()
        this.setState (() => {
            return  {isLoading: false}
        })
    }      
    onChangeKeyword(keyword){
        this.setState(() => {
            return{
                keyword
            }
        })
        this.props.keywordChangeHandler(keyword);
    }
render(){
    const notesData = this.state.Notes.filter((i) => {
        return i.title.toLowerCase().includes(
            this.state.keyword.toLowerCase()
        )
    }) 
    return (
        <div>
            <SearchBar changeText={this.props.Locale === 'en' ? 'Active' : 'Aktif'} keyword={this.state.keyword} keywordChange={this.onChangeKeyword}/>
            {
                this.state.isLoading ?
                <LoadingBar />
                :
                notesData.length === 0 ? 
                <h3 className='text-not-notes'>{this.props.Locale === 'en' ? 'Not Notes Here' : 'Tidak ada Catatan'}</h3>
                :
                <CardList notes={notesData}/>
            }
            <FloatingButton/>
        </div>
    )
}
}

Home.propTypes = {
    keywordChangeHandler: PropTypes.func,
    defaultKeyword: PropTypes.string,
    Locale: PropTypes.string.isRequired
}
export default HomeWrapper;