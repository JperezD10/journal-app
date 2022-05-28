import React from 'react'

export const JournalEntry = ({entry}) => {
    return (
        <div className='journal__entry pointer'>
            <div className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true)'
                }}>

            </div>
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo dia
                </p>
                <p className='journal__entry-content'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque vel pariatur quis. Asperiores amet, vitae eius odit totam quo aut nihil facilis labore corrupti magni eum. Doloribus nulla minima animi!
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>8</h4>
            </div>
        </div>
    )
}
