import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import {NoteProps} from "../types";
import { FaWindowClose, FaPen, FaAngleDoubleDown, FaAngleDoubleUp, FaEraser, FaTimes } from 'react-icons/fa';

const Note : React.FunctionComponent<NoteProps> = ({noteInfo, updateNotesList} : NoteProps) => {
    //state for tags of the note
    const [noteTags, setNoteTags] = useState(noteInfo.tags);
    //state for content of the note
    const [newContent, setContent] = useState(noteInfo.content);
    //state for text when in editing mode with highlighting tags
    const [editedContent, setEditedContent] = useState(newContent);

    //get all tags from content of note
    const getAllTagsFromContent = () => {
        let arrayOfContent = newContent.split(' ').filter(word => word[0] === "#");
        noteInfo.tags = arrayOfContent.filter(word => word[0] === "#") || [];
        setNoteTags(arrayOfContent);

        highlightText();
    }

    //add highlights to tags in text when in editing mode
    const highlightText = () => {
        let editedContent = newContent.split(' ');
        editedContent.forEach((val, index)=>{
            if (val[0] == "#") editedContent[index] = `<b>${val}</b>`
         });
        setEditedContent(editedContent.join(" "));
    }

    //if there is no tags create new ones from content
    if(noteInfo.tags == undefined || noteInfo.tags == null) {
        getAllTagsFromContent();
    }

    const [isEditMode, setDisplayMode] = useState(false);
    function openContentEditor () {
        isEditMode === true ? setDisplayMode(false) : setDisplayMode(true);
        getAllTagsFromContent();
    }

    //onchange in edit mode
    function changeContent (e: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.currentTarget.value);
        noteInfo.content = newContent;
        getAllTagsFromContent();
    }

    //state for show/hide action buttons (edit, delete)
    const [actionButtons, setActionButtons] = useState(false);
    function showActionButtons() {
        actionButtons === true ? setActionButtons(false) : setActionButtons(true);
    }

    //update storage if tags changed
    useEffect(() => {
        let notes = JSON.parse(localStorage.getItem("AppData") || "[]");
        if (notes) {
            let currentIndex = notes.findIndex((note : NoteProps["noteInfo"]) => note.id === noteInfo.id);
            if (currentIndex != undefined && currentIndex != -1) {
                notes[currentIndex].tags = noteTags;
                localStorage.setItem('AppData', JSON.stringify(notes));
            }
        }
      }, [noteTags?.length]);
    
    function deleteTag(e: MouseEvent<HTMLButtonElement>) {
        let updatedTags = noteTags?.filter((tag) => tag !== e.currentTarget.id) || [];
        setNoteTags((notesTags) => 
            updatedTags
        );
        //setNoteTags(updatedTags);
    }


    return(
    <div className='noteCard'>
        {(actionButtons) 
            ? <FaAngleDoubleUp title="Hide actions" className='menuIcon icon-button' onClick={showActionButtons}/> 
            : <FaAngleDoubleDown title="Show actions" className='menuIcon icon-button' onClick={showActionButtons}/>}
        {!isEditMode ? <p>{newContent}</p> : <p dangerouslySetInnerHTML={{__html: editedContent}}></p>}
        {isEditMode && <>
            <textarea value={newContent} onChange={ e => changeContent(e)} />
            <FaWindowClose title="Close edit mode" className='icon-button' onClick={openContentEditor}/>
        </>}
        <div className='noteTags'>
            {noteTags?.map( (tag) => <span key={tag}> {tag} <button id={tag} onClick={event => deleteTag(event)}><FaTimes title="Delete tag" className="tagIcon icon-button" /></button> </span>)}
        </div>
        {actionButtons && <>
            <button title="Edit note" onClick={openContentEditor} disabled={isEditMode} ><FaPen/> Edit</button>
            <button title="Delete note" onClick={() => updateNotesList(noteInfo.id)}><FaEraser/> Delete</button>
        </>}
    </ div>)
}

export default Note;