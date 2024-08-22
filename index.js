const express = require('express')
const path = require('path')

// host js files from src/js/*
const app = express()

// allow all files from src
app.use('/src', express.static('src'))

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/src/css/index.css', (_req, res) => {
  res.header('Content-Type', 'text/css')
  res.sendFile(
    path.join(__dirname, '/src/css/index.css')
  )
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
