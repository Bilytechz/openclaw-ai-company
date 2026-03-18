const fs = require("fs")

function runAgents() {

    let data

    try {
        data = JSON.parse(fs.readFileSync("tasks/tasks.json"))
    } catch (error) {
        console.log("No tasks found")
        return
    }

    data.tasks.forEach(task => {

        if (!task.status) {

            task.status = "completed"

            fs.appendFileSync(
                "logs/system.log",
                "Task completed: " + task.task + "\n"
            )

        }

    })

    fs.writeFileSync(
        "tasks/tasks.json",
        JSON.stringify(data, null, 2)
    )

}

setInterval(runAgents, 5000)

console.log("Agent runner started")