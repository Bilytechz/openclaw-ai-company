const express = require("express")

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("OpenClaw AI Company Dashboard Running")
})

app.listen(PORT, () => {
  console.log("Dashboard running on port " + PORT)
})