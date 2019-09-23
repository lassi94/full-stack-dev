import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'
import Blog from '../components/Blog'

describe('Tests for SimpleBlog component', () => {

    test('check that author, title and likes are rendered', () => {

        const blog = {
            title: 'Title',
            author: 'author',
            likes: 3
        }

        const comp = render(
            <SimpleBlog blog={blog}/>
        )

        expect(comp.container).toHaveTextContent('Title')
        expect(comp.container).toHaveTextContent('author')
        expect(comp.container).toHaveTextContent(3)
    })

    test('check that if button is pushed twice, the same function is called twice', () => {
        const blog = {
            title: 'Title',
            author: 'author',
            likes: 3
        }

        const mock = jest.fn()
        const comp = render(
            <SimpleBlog blog={blog} onClick={mock} />
        )

        const click = comp.container.querySelector('.button')
        fireEvent.click(click)
        fireEvent.click(click)

        expect(mock.mock.calls.length).toBe(2)
    })

})

describe('Tests for Blog component', () => {

    let comp

    beforeEach(() => {
        const blog = {
            title: 'Title',
            author: 'author',
            likes: 3,
            url: 'https://example.com'
        }

        comp = render(
            <Blog blog={blog} />
        )
    })


    test('Check that name and writer are only present by default', () => {
        const defBody = comp.container.querySelector('.item')
        expect(defBody).toHaveTextContent('Title')
        expect(defBody).toHaveTextContent('author')

        const hiddenBody = comp.container.querySelector('.hidden')
        expect(hiddenBody).toHaveStyle('display:none')
    })

    test('Check that after click likes and url are rendered', () => {

        const click = comp.container.querySelector('.click')
        fireEvent.click(click)

        const hiddenBody = comp.container.querySelector('.hidden')
        expect(hiddenBody).not.toHaveStyle('display:none')
    })
})