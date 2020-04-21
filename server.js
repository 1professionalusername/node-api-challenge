const express = require('express')
const server = express()
server.use(express.json())
//.Router 130
const projectDb = require('./data/helpers/projectModel')
const actionDb = require('./data/helpers/actionModel')

//This project needs work(obviously). 
//Separate concerns into appropriate files/folders
//Check in Insomnia every step of the way. 
//Also, find out why nodemon would not auto refresh. Kept having to stop and restart the server.
//.returning() is not supported by sqlite3 and will not have any effect. <------Investigate this console error






// const welcomeRouter = require("./welcome/welcome-router")
// const hubsRouter = require("./hubs/hubs-router")

// server.use("/", welcomeRouter)
// server.use("/api/hubs", hubsRouter)





// server.use('/routes/projects', projects);
// server.use('/routes/actions', actions);

//Projects-----------------------

GET: '/'
server.get('/projects', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error =>
            res.status(500).json({ error: "Server error" })
        );
})


//POST: '/projects' 
server.post('/projects', (req, res) => {

    //turnary replaces if statement to save space (condition ? exprIfTrue : exprIfFalse)
    !req.body
        ?
        res.status(400).json({ Error: 'Name and description required fields' })
        :
        projectDb.insert(req.body)

            .then(post => {
                res.status(201).json(post)
            })
            .catch(() => {
                res.status(500).json({ Error: 'Server error' })
            })

})

//Get: '/projects/:id
server.get('/projects/:id', validatePost, (req, res) => {
    projectDb.get(req.params.id).then(project => {
        res.status(200).json(project)
    }).catch(error =>
        res.status(500).json({ error: `Server error` })
    )
});


//PUT: '/projects/:id'
server.put('/projects/:id', validatePost, (req, res) => {

    !req.body
        ?
        res.status(400).json({ Error: 'Name and description required fields' })
        :
        projectDb.update(req.project, req.body)

            .then(post => {
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(500).json({ Error: 'Server error' })
            })
})

//DELETE: '/projects/:id' 
server.delete('/projects/:id', validatePost, (req, res) => {
    projectDb.remove(req.project)
        .then(number => {
            console.log(number)
            res.status(200).json({ Success: `Project successfully deleted` })
        })
        .catch(() => {
            res.status(500).json({ Error: 'Server error' })
        })
})

//Actions-----------------------

//GET: '/projects/:id/actions' 
server.get('/projects/:id/actions', validatePost, (req, res) => {
    projectDb.getProjectActions(req.project)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ Error: 'Server error' })
        })
})

//GET: '/actions/:id' 
server.get('/actions/:id', validateAction, (req, res) => {
    actionDb.get(req.action)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ Error: 'Server error' })
        })
})

//POST: '/projects/:id/actions'
server.post('/projects/:id/actions', validatePost, (req, res) => {
    req.body.project_id = req.project

    !req.body
        ?
        res.status(400).json({ Error: `Description and notes are required fields` })
        :
        actionDb.insert(req.body)

            .then(action => {
                res.status(201).json(action)
            })
            .catch(error => {
                res.status(500).json({ Error: 'Server error' })
            })
})

//PUT: '/actions/:id'
server.put('/actions/:id', validateAction, (req, res) => {

    !req.body
        ?
        res.status(400).json({ error: 'Description and notes required fields.' })
        :
        actionDb.update(req.action, req.body)

            .then(action => {
                res.status(200).json(action)
            })
            .catch(() => {
                res.status(500).json({ Error: 'Server error' })
            })
})

//DELETE: '/actions/:id'
server.delete('/actions/:id', validateAction, (req, res) => {
    actionDb.remove(req.action)
        .then(num => {
            console.log(num)
            res.status(200).json({ Success: `Project sucessfully deleted!` })
        })
        .catch(() => {
            res.status(500).json({ Error: 'Server error' })
        })
})




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