export interface ListProps {
    notes: Array<{id: string, content: string, tags?: Array<string> }>,
    hadnleNotesChange: (updatedNotes: ListProps["notes"]) => void,
}

export interface NoteProps {
    noteInfo: {
        id: string,
        content: string,
        tags?: Array<string>,
    }
    updateNotesList: (id: string) => void
}

export interface FilterProps {
    filterListByTag: (tags: string) => void,
}