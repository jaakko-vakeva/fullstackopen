const { json } = require("express")

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else {
        let sum = 0
        for (let i = 0; i < blogs.length; i++) {
            sum += blogs[i].likes
        }
        return sum
    }
}



const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return []
    } else {
        let result = blogs[0]
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > result.likes) result = blogs[i]
        }
        return ( 
            {
                title: result.title,
                author: result.author,
                likes: result.likes
            }
        )
    }
}


const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return []
    } else {

        // initialize result
        let result = 
        {
            author: blogs[0].author, 
            blogs: 1
        }

        for (let i = 0; i < blogs.length; i++) {
            // the number of blogs that the current author has
            let nOfBlogs = blogs.filter(b => b.author === blogs[i].author).length
            if (nOfBlogs > result.blogs) {
                result.author = blogs[i].author
                result.blogs = nOfBlogs
            }
        }
        return result   
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return []
    } else {
        //initialize result
        let result = 
        {
            author: blogs[0].author, 
            likes: 1
        }

        for (let i = 0; i < blogs.length; i++) {
            // sum of likes that the blogs of current author have
            let currentLikes = blogs.filter(b => b.author === blogs[i].author).map(b => b.likes).reduce((sum, val) => sum + val, 0)
            if (currentLikes > result.likes) {
                result.author = blogs[i].author
                result.likes = currentLikes
            }
        }
        return result   
    }
}



  
module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}