import { useState } from 'react'

export const useChange = (initialValue) => {

    const [value, setValue] = useState(initialValue)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return [
        { value, onChange }, { reset: () => setValue(initialValue) }
    ]
}
