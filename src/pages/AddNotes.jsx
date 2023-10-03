import React from "react";
import { useContext } from "react";
import FormInput from "../Component/FormInput";
import { LocaleContext } from "../context/NoteContext";

const AddNotes = () => {
    const {Locale} = useContext(LocaleContext)
    return(
        <section className="add-notes">
         <FormInput Locale={Locale}/>
        </section>
    )
}
export default AddNotes;