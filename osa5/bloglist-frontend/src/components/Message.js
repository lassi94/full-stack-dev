import React from 'react'

const Message = ({ message }) => {

    if(message !== null || undefined){
        return(
            <>
                <div className="message">
                    <p>{message}</p>
                </div>
            </>
        )
    }
}

export default Message