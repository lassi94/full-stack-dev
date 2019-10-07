const lodash = require('lodash')

const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) =>{

    const array = []
    const reducer = (acc, curr) => acc+curr

    blogs.forEach(element => {
        array.push(element.likes)
    });

    if(array.length !== 0){
        const likes = array.reduce(reducer)

        return likes
    }else{
        return 0
    }
}

const favoriteBlog = (blogs) =>{

    const reducer = (prev, curr) => {
        return prev.likes > curr.likes ? prev:curr
    }

    if(blogs.length !== 0){

        const obj = blogs.reduce(reducer)
        return obj

    }else{
        console.log('array has no objects!!')
    }


}

const mostBlogs = (blogs) => {

    if(blogs.length !== 0){

        const array = blogs.map(item => item.author)

        //const count = lodash.chains(array).countBy().toPairs()
        const author = lodash.head(lodash(array).countBy().entries().maxBy(lodash.last))

        const reducer = (calc, curr) => {
            if(curr === author){
                calc++
            }
            return calc
        }

        const count = array.reduce(reducer, 0)

        console.log(count)

        const result = JSON.parse(`{"${author}":"${count}"}`)
        
        console.log(result)

        //const result = lodash.values(lodash.groupBy(blogs)).map(item => ({author: item[0].author, count: item.length}))
        //const result = lodash.entries(lodash.countBy(blogs)).map(([author, count]) => {author, count})
        return result
    }else{
        console.log('array does not have any elements')
    }
}

const mostLikes = (blogs) => {
    if(blogs.length !== 0){
        const array = blogs.map(item => JSON.parse(`{"author":"${item.author}", "likes": ${item.likes}}`))
        console.log(array)

        let result = lodash(array).groupBy('author').map((objects, property) => ({
            'author': property,
            'likes': lodash.sumBy(objects, 'likes')
        })).value()

        result.sort((first, second) => first.likes < second.likes) ? 1:-1

        console.log(result)

        return result[0]


    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
