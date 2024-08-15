const express = require('express')
const fs = require('fs')
const env = require('dotenv')
env.config()
const app = express()



app.get('/', getAllTasks = async (req,res)=>{
    const tasks = JSON.parse(fs.readFileSync('./tasks.js','utf8'))
    res.json(tasks)
})

app.post('/create', createTask = async (req,res)=>{
    const newTask = req.body
    const created = await fs.writeFileSync('./tasks.js',JSON.stringify(newTask))
    res.JSON(created)

})







app.use(express.json())
app.listen(process.env.PORT, console.log(`app is running on http://${process.env.LOCAL}:${process.env.PORT}`))
