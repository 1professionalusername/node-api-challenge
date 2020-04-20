const express = require('express')

const projectDb = require('./data/helpers/projectModel')



//GET: '/' 
server.get('/projects', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
})

module.exports = server