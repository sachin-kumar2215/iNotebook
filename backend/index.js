const connectToMongo = require('./db.js');
const express = require('express')
const app = express()
var cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get("/",(req,res)=>{
  res.json("Hello");
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
connectToMongo();