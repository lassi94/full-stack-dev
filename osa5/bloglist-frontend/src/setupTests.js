import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

let items = {}

const localStorage = {
    setItem: (id, item) => {
        items[id] = item
    },
    getItem: (id) => items[id],
    clear: items = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorage })