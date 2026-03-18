const fs = require("fs")

function generateTask() {

    let data

    try {
        data = JSON.parse(fs.readFileSync("tasks/tasks.json"))
    } catch {
        data = { tasks: [] }
    }

    const newTask = {
        id: Date.now(),
        task: "Build feature " + Math.floor(Math.random() * 100),
        agent: "developer"
    }

    data.tasks.push(newTask)

    fs.writeFileSync(
        "tasks/tasks.json",
        JSON.stringify(data, null, 2)
    )

    fs.appendFileSync(
        "logs/system.log",
        "Planner created task: " + newTask.task + "\n"
    )

}

setInterval(generateTask, 15000)

console.log("Planner agent started")