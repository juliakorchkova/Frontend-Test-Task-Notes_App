import React, { useEffect, useState, useId } from 'react';
import './App.scss';
import {FaPlus, FaTimes} from 'react-icons/fa';

import NotesList from "./components/NotesList";
import { ListProps, NoteProps } from './types';

let AppData = {
  NotesList: [
  {
    id: "5124358966153",
    content: "Example note with #tags and #content",
    tags: new Array("#tags", "content")
  },
  {
    id: "512335468435",
    content: "Second note and #new #brand #tags",
  },
  {
    id: "2313543484312",
    content: "Example without notes",
  },
  ]
}

function App() {
  //check if app data exist in local storage
  let StorageAppData = JSON.parse(localStorage.getItem("AppData") || "null");
  const [AppNotes, addNewNote] = useState(StorageAppData || AppData.NotesList);
  
  //set updated notes to local storage
  useEffect(() => {
    localStorage.setItem('AppData', JSON.stringify(AppNotes));
  }, [AppNotes.length]);

  //content of the new note from input
  const [noteContent, setNoteContent] = useState('');
  //visibility of input for new note
  const [newNoteInputHidden, setNoteInputVisibility] = useState(false);

  //add new note
  function addNote() {
    addNewNote([{id: String(+new Date()), content: noteContent, tags: undefined}, ...StorageAppData]);
    setNoteInputVisibility(false);
    setNoteContent('');
  }
  
  function handleNewNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNoteContent(e.currentTarget.value);
  }

  function hadnleNotesChange(updatedNotes: ListProps["notes"]) :void {
    addNewNote(updatedNotes);
  }

  return (
    <div className="App">
      <nav>
        {newNoteInputHidden && <>
          <textarea value={noteContent} onChange={handleNewNoteChange} />
          <button title="Submit new note" onClick={addNote}>Submit</button>
        </>}
        {newNoteInputHidden 
          ? <FaTimes title="Close" className='icon-button' onClick={() => setNoteInputVisibility(!newNoteInputHidden)} /> 
          : <FaPlus title="Add new note" className='icon-button' onClick={() => setNoteInputVisibility(!newNoteInputHidden)} />}
      </nav>
      <NotesList key={AppNotes.length} notes={AppNotes} hadnleNotesChange={hadnleNotesChange} />
    </div>
  );
}

export default App;
