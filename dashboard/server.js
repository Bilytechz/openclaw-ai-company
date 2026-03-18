const http = require("http")
const { Server } = require("socket.io")
const si = require("systeminformation")
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
  { name: "product_manager", status: "online" },
  { name: "planner", status: "working" },
  { name: "supervisor", status: "online" },
  { name: "memory", status: "idle" },
  { name: "ui_designer", status: "idle" },
  { name: "developer", status: "working" }
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
app.use(express.json())

app.post("/task", (req, res) => {

  const taskText = req.body.task

  if (!taskText) {
    return res.json({ status: "error", message: "task missing" })
  }

  let data

  try {
    data = JSON.parse(fs.readFileSync("../tasks/tasks.json"))
  } catch {
    data = { tasks: [] }
  }

  const newTask = {
    id: Date.now(),
    task: taskText,
    agent: "developer"
  }

  data.tasks.push(newTask)

  fs.writeFileSync(
    "../tasks/tasks.json",
    JSON.stringify(data, null, 2)
  )

  fs.appendFileSync(
    "../logs/system.log",
    "Manual task created: " + taskText + "\n"
  )

  res.json({ status: "ok" })

})
app.get("/resources", async (req, res) => {

  const cpu = await si.currentLoad()
  const mem = await si.mem()
  const disk = await si.fsSize()

  res.json({
    cpu: cpu.currentLoad.toFixed(2),
    ram: ((mem.active / mem.total) * 100).toFixed(2),
    disk: disk[0].use
  })

})
const server = http.createServer(app)
const io = new Server(server)

server.listen(PORT, () => {
  console.log("Dashboard running on http://localhost:" + PORT)
})
setInterval(() => {

  io.emit("system_update", {
    message: "system refresh"
  })

}, 3000)