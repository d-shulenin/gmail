import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  return (
    <div className='searchbar'>
        <SearchIcon />
        <input type='text' placeholder='Search mail'></input>
    </div>
  )
}

export default Searchbar