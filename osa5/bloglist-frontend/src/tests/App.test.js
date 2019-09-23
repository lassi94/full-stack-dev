import React from 'react'
import { render, wait } from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'

describe('Integration tests for App component', () => {

    test('Show loginform if user is not logged in', async () => {
        const comp = render(<App />)
        comp.rerender(<App />)
        await wait(() => comp.container.querySelector('.login'))
        expect(comp.container).toHaveTextContent('Username')
        expect(comp.container).toHaveTextContent('Password')
        expect(comp.container).not.toHaveTextContent('Blog posts')
    })
    test('If user is logged in, then render blogs', async () => {

        const localStorageUser = {
            username: 'testaaaja',
            token: '1239u1094928312312',
            name: 'testi testaaja'
        }
        localStorage.setItem('signed-in', JSON.stringify(localStorageUser))

        const comp = render(<App />)
        comp.rerender(<App />)

        await wait(() => comp.container.querySelector('.item'))
        const posts = comp.container.querySelectorAll('.item')

        expect(posts.length).toBe(2)
        expect(comp.container).toHaveTextContent('Lehtinen')
    })
})