import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { addNote } from "../utils/network-data";
import { BiCheck } from "react-icons/bi";
import { useContext } from "react";
import { LocaleContext } from "../context/NoteContext";
const FormWrapper = () => {
    const {Locale} = useContext(LocaleContext);
    const navigate = useNavigate()
    return (
        <FormInput navigatePage={navigate} Locale={Locale}/>
    )
}
class FormInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            body: '',
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    onChangeTitle(event) {
        this.setState(() => {
            return{
                title: event.target.value
            }
        })
    }
    onChangeDesc(event){
        this.setState(() => {
            return{
                body: event.target.innerHTML
            }
        })
    }
   async submitData(event) {
        event.preventDefault();
        addNote(this.state)
        const {navigatePage} = this.props;
        navigatePage('/')
    } 
    render(){
            return (
            <form onSubmit={this.submitData} className='form-input-book'>
            <div className="input-title">
                <input type="text" className="input-title-data" placeholder={this.props.Locale === 'en' ? "Insert Title Notes" : "Masukan Judul Catatan"} onChange={this.onChangeTitle}/>
            </div>
            <div className="input-desc">
            <p contentEditable data-placeholder={this.props.Locale === 'en' ? "Insert Notes.." : "Masukan Catatan Anda.."} onInput={this.onChangeDesc}></p>
            </div>
            <div className="btn-submit-notes">
            <button type="submit" className="submit-data-notes"><BiCheck size={25}/></button>
            </div>
            </form>
        )
    }
}
FormInput.propTypes = {
    navigatePage: PropTypes.func.isRequired,
    Locale: PropTypes.string.isRequired
}

export default FormWrapper;