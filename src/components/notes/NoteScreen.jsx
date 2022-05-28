import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        <NotesAppBar/>

        <div className='notes__content'>
            <input 
              type="text"
              placeholder='Some awsome title'
              className='notes_title-input'
              autoComplete='off' />

            <textarea 
              className='notes__textarea'
              placeholder='What happened today'></textarea>

            <div className='notes__image'>
              <img src="https://fotoarte.com.uy/wp-content/uploads/2019/03/Landscape-fotoarte.jpg" alt="imagen" />
            </div>
        </div>
    </div>
  )
}
