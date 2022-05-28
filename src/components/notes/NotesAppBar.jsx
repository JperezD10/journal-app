import React from 'react'

export const NotesAppBar = () => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className='notes_appbar'>
        <span>{new Date(Date.now()).toLocaleString('es-AR', options)}</span>
        <div>
            <button className='btn'>
                Picture
            </button>
            <button className='btn'>
                Save
            </button>
        </div>
    </div>
  )
}
