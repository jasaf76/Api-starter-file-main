const express = require("express")

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({message:'Hello World!',api:'NFT Marketplace'})
})

app.post('/', (req, res) => {
  res.status(201).json({message:'Hello World!',api:'NFT Marketplace44444444'})
})
const port = 3003;
app.listen(port, () => {
  console.log(`Server läuft in Port ${port}`);
})
