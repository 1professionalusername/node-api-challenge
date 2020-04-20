const express = require('express')
//.Router
const projectDb = require('./data/helpers/projectModel')
//const actionDb = require('./data/helpers/actionModel')

const server = express()
server.use(express.json())

// const projects = require('./routes/projects')
// const actions = require('./routes/actions')




// server.use('routes/projects', projects);
// server.use('routes/actions', actions);



//Middleware-----------------------

function validatePost(req, res, next) {
    projectDb.get(req.params.id)
        .then(item => {
            if (!item) {
                res.status(400).json({ Error: "No project with specified Id" })
            } else {
                req.body.project_id = item.project_id
                req.project = req.params.id
                next()
            }
        })
}

function validateAction(req, res, next) {
    actionDb.get(req.params.id)
        .then(item => {
            if (!item) {
                res.status(400).json({ Error: "No action with specified Id" })
            } else {
                req.action = req.params.id
                next()
            }
        })
}




module.exports = server