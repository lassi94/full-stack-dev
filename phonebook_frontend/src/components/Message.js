import React from 'react'


const Message = ({error}) => {

    if(error===null){
        return null
    }else if(error.includes('not')){
        return(
            <div className="errorMsg">
                <div className="msg-content">
                    <p>{error}</p>
                </div>
            </div>
        )
    }else{
        return(
            <div className="SuccessMsg">
                <div className="msg-content">
                    <p>{error}</p>
                </div>
            </div>
        )
    }
}

export default Message