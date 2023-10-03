import React from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../Component/CardList";
import SearchBar from "../Component/SearchBar";
import PropTypes from "prop-types";
import { getArchivedNotes } from "../utils/network-data";
import { useContext } from "react";
import { LocaleContext } from "../context/NoteContext";
import LoadingBar from "../Component/LoadingBar";

const ArchiveWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {Locale} = useContext(LocaleContext)
    const keyword = searchParams.get('keyword')
    const changeSearch = (keyword) => {
        setSearchParams({ keyword })
    }
    return <Archive Locale={Locale} defaultKeyword={keyword} keywordChangeHandler={changeSearch} />
}

class Archive extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            keyword: props.defaultKeyword || '',
            Notes: [],
            isLoading: true
        }
        this.searchHandler = this.searchHandler.bind(this)
    }
    async onUpdateStateNotes(){
    const {data} = await getArchivedNotes()
    this.setState(() => {
        return {
            Notes: data,
        }
    })
    }
  async componentDidMount() { 
    this.onUpdateStateNotes();
    this.setState(() => {
        return {isLoading:false}
    })
    }
    searchHandler(keyword){
        this.setState(() => {
            return {
                keyword
            }
        })
        const {keywordChangeHandler} = this.props;
        keywordChangeHandler(keyword)
    }
    render(){
        const NoteData = this.state.Notes.filter(i => {
            return i.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            )
        })

        return(
            <div>
                <SearchBar changeText={this.props.Locale === 'en' ? 'Archive' : 'Arsip'} keyword={this.state.keyword} keywordChange={this.searchHandler}/>
                {
                     this.state.isLoading ?
                     <LoadingBar />
                     :
                    NoteData.length === 0 ? 
                    <h3 className='text-not-notes'>{this.props.Locale === 'en' ? 'Not Archive Here' : 'Tidak ada Arsip'}</h3>
                    :
                    <CardList notes={NoteData}/>
                }
            </div>
    
        )
    }
}

Archive.propTypes = {
    keywordChangeHandler: PropTypes.func,
    defaultKeyword: PropTypes.string,
    Locale: PropTypes.string.isRequired
}


export default ArchiveWrapper;