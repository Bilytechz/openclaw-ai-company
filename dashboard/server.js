const express = require("express")
const path = require("path")
const fs = require("fs")

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
    tasks: taskCount,
    logs: logs
  }

  res.json(system)

})
let taskCount = 0

try {
  const taskData = JSON.parse(fs.readFileSync("../tasks/tasks.json"))
  taskCount = taskData.tasks.length
} catch (error) {
  taskCount = 0
}
app.listen(PORT, () => {
  console.log("Dashboard running on http://localhost:" + PORT)
})