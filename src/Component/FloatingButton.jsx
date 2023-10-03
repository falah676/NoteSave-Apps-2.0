import React from "react";
import {  useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { archiveNote, deleteNote, unarchiveNote } from "../utils/network-data";
import { BiPlus, BiSolidArchiveIn, BiSolidArchiveOut, BiSolidTrashAlt } from "react-icons/bi";
import { useContext } from "react";
import { LocaleContext } from "../context/NoteContext";
const FloatingButton = () => {
    const {Locale} = useContext(LocaleContext);
    const navigate = useNavigate()
    const navigatePages = () => {
        navigate('/AddNotes')
    }
    return(
        <div className="btn-action">
            <button type="button" title={Locale === 'en' ? 'Add Notes' : 'Tambah Catatan'} onClick={navigatePages}><BiPlus size={25}/></button>
        </div>
    )
}

const DetailButton = ({isArchive, id}) => {
    const {Locale} = useContext(LocaleContext);
    const navigate = useNavigate()
    const handleDeleteClick = async () => {
       await deleteNote(id);
        navigate('/')
    }
    const handleArchiveClick =  async () => {
        isArchive ?  await unarchiveNote(id) : await archiveNote(id)
        navigate('/')
    }

    return <div className="btn-action">
     <button type="button" title={Locale === 'en' ? 'Delete Notes' : 'Hapus Catatan'} onClick={handleDeleteClick}><BiSolidTrashAlt size={30}/></button>
   
    <button type="button" title={Locale === 'en' ? (isArchive ? 'Unarchive' : 'Archive') : (isArchive ? 'Keluarkan dari arsip' : 'Arsipkan')} onClick={handleArchiveClick}>
        {
        isArchive ?
       <BiSolidArchiveOut size={30}/>
        :
        <BiSolidArchiveIn size={30}/>
        }
    </button>
</div>
}

DetailButton.propTypes = {
    isArchive: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
}
export{
    FloatingButton,
    DetailButton
};