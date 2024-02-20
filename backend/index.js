const connectToMongo = require('./db.js');
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World! sachin is here')
// })
app.use(express.json())
app.use(cors())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));




app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
connectToMongo();