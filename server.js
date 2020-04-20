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
server.post('/', (req, res) => {

    //turnary replaces if statement to save space ? :
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
server.get('/:id', validatePost, (req, res) => {
    projectDB.get(req.params.id).then(project => {
        res.status(200).json(project)
    }).catch(error =>
        res.status(500).json({ error: `Server error` })
    )
});


//PUT: '/projects/:id'
server.put('/:id', validatePost, (req, res) => {

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
server.delete('/:id', validatePost, (req, res) => {
    projectDb.remove(req.project)
        .then(number => {
            res.status(200).json({ Success: `Project '${number}'successfully deleted` })
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