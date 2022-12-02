import React, { useState } from 'react';
import {FilterProps} from "../types";
import {FaFilter, FaUndoAlt} from 'react-icons/fa';
/*
interface FilterProps {
    filterListByTag: (tags: string) => void,
}
*/
const FilterBar : React.FunctionComponent<FilterProps> = ({filterListByTag}) => {
    const [filter, setFilter] = useState("");    
    function changeFilter(e : React.ChangeEvent<HTMLInputElement>) {
        setFilter(e.currentTarget.value);
    }
    
    return(<div className='filterBar'>
        <input placeholder="Enter search tags: #newyear #2023" value={filter} onChange={e => changeFilter(e)} type="text" />
        <FaFilter title="Filter notes" className='icon-button' onClick={() => filterListByTag(filter)} />
        <FaUndoAlt title="Load all notes" className='icon-button' onClick={() => filterListByTag("")}/>
    </ div>)
}

export default FilterBar;