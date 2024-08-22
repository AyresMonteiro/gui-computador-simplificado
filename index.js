const express = require('express')
const path = require('path')

// host js files from src/js/*
const app = express()

// allow all files from src
app.use('/src', express.static('src'))

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/src/css/:file', (_req, res) => {
  const pathParts = _req.params.file.split('?')

  let file = pathParts[0]

  const fileRegex = /^([a-z-]+).css$/g

  if (!fileRegex.test(file)) {
    return res.status(404).send('Not found')
  }

  if (file !== 'index.css') file = 'theme/' + file

  res.header('Content-Type', 'text/css')
  res.sendFile(path.join(__dirname, '/src/css/', file))
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
