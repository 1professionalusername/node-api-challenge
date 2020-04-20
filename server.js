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





module.exports = server