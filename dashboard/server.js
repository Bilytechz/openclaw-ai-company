const fs = require("fs")
const express = require("express")
const path = require("path")

const app = express()
const PORT = 3000

// serve frontend files
app.use(express.static(path.join(__dirname, "frontend")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"))
})
app.get("/system", (req, res) => {

  let logs = "no logs"

  try {
    logs = fs.readFileSync("../logs/system.log", "utf8")
  } catch (error) {
    logs = "log file not found"
  }

  const system = {
    agents: [
      "product_manager",
      "planner",
      "supervisor",
      "memory",
      "ui_designer",
      "developer"
    ],
    status: "running",
    tasks: 0,
    logs: logs
  }

  res.json(system)

})
app.listen(PORT, () => {
  console.log("Dashboard running on http://localhost:" + PORT)
})