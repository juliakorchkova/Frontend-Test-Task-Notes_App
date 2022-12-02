import React, { useState, useEffect } from 'react';
import {ListProps, NoteProps} from "../types";
import Note from "./Note";
import FilterBar from "./FilterBar";

const NotesList : React.FunctionComponent<ListProps> = ({notes, hadnleNotesChange}) => {
    //state for initial notes
    const [initialNotes, setInitialState] = useState(notes);
    //state for notes that are filtered in some way
    const [AppNotes, setAppNotes] = useState(notes);

    //update notes data in storage if anything in initial notes changed
    useEffect(() => {
        localStorage.setItem('AppData', JSON.stringify(initialNotes));
        hadnleNotesChange(initialNotes);
      }, [initialNotes]);

    //update list if in Note component was clicked delete button
    function updateNotesList(id: string): void {
        setAppNotes((notesList) =>
            notesList.filter((note) => note.id !== id)
        );

        setInitialState((notesList) =>
            notesList.filter((note) => note.id !== id)
        );
    }

    //filter notes by one or several tags from input
    function filterListByTag(tags: string): void {
        //get updated notes
        let notes = JSON.parse(localStorage.getItem("AppData") || "[]");
        if (notes.length > 0) {
            //if there are notes in storage set to the state of visible notes
            setAppNotes(notes);
        }
        
        //if there is not filter or empty string return to the script
        if((tags === "") || (tags === " ")) {
            return;   
        }

        //if there is filter compare tags in notes with tags in input
        let filterTags = tags.split(" ");
        let filterArray = notes.filter((note : NoteProps["noteInfo"]) => {
                //returns true only if all tags from input in note's tags
                let isHere = filterTags.every(tag => {
                    if (note.tags !== undefined) {
                        return note.tags?.indexOf(tag) >= 0
                    }
                });
                return isHere;
        });
        //set filtered notes to state
        setAppNotes(filterArray);
    }

    return(<>
        <main>
            <FilterBar filterListByTag={filterListByTag} />
            <div className="notesList">
                {AppNotes.length == 0 && <h1>There are no posts with this tag/tag! Try again</h1>}
                {AppNotes?.map( note => <Note key={note.id} noteInfo={note} updateNotesList={updateNotesList} />)}
            </div>
        </main>
    </>)
}

export default NotesList;