// const express = require('express')
// const projectDb = require('../data/helpers/projectModel')
// //const actionDb = require('../data/helpers/actionModel')

// const server = express()
// server.use(express.json())








// //POST: '/projects' 
// server.post('/projects', (req, res) => {
//     const { name, description } = req.body

//     !name || !description
//         ?
//         res.status(400).json({ Error: 'HALT! You MUST provide both a Name and a Description!' })
//         :
//         projectDb.insert(req.body)

//             .then(post => {
//                 res.status(201).json(post)
//             })
//             .catch(() => {
//                 res.status(500).json({ Error: 'AH! There was an ERROR adding the Post to the Database!' })
//             })

// })

// //PUT: '/projects/:id'
// server.put('/projects/:id', validatePost, (req, res) => {
//     const { name, description } = req.body

//     !name || !description
//         ?
//         res.status(400).json({ Error: 'OOF! You must provide BOTH a Name and a Description!' })
//         :
//         projectDb.update(req.project, req.body)

//             .then(post => {
//                 res.status(200).json(post)
//             })
//             .catch(() => {
//                 res.status(500).json({ Error: 'UGH! There was an ERROR updating the Post in the Database!' })
//             })
// })

// //DELETE: '/projects/:id' 
// server.delete('/projects/:id', validatePost, (req, res) => {
//     projectDb.remove(req.project)
//         .then(number => {
//             res.status(200).json({ Success: `${number}s' items were SUCESSFULLY DELETED from the Database!` })
//         })
//         .catch(() => {
//             res.status(500).json({ Error: 'AHK! There was an ERROR when trying to REMOVE the Post from the Database!' })
//         })
// })

//module.exports = server