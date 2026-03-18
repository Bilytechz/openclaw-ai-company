const socket = io()

socket.on("system_update", () => {
    loadSystem()
    loadResources()
})
async function loadSystem() {

    const response = await fetch("/system")
    const data = await response.json()

    const agentsList = document.getElementById("agents")
    const status = document.getElementById("status")
    const tasks = document.getElementById("tasks")
    const logs = document.getElementById("logs")

    agentsList.innerHTML = ""

    data.agents.forEach(agent => {

    const li = document.createElement("li")

    li.textContent = agent.name + " — " + agent.status

    agentsList.appendChild(li)

})

    status.textContent = data.status
    tasks.textContent = data.tasks
    logs.textContent = data.logs

}

loadSystem()
async function loadResources() {

    const response = await fetch("/resources")
    const data = await response.json()

    document.getElementById("cpu").textContent = data.cpu
    document.getElementById("ram").textContent = data.ram
    document.getElementById("disk").textContent = data.disk

}

setInterval(() => {
    loadSystem()
    loadResources()
}, 3000)
async function createTask() {

    const input = document.getElementById("taskInput")

    const task = input.value

    if (!task) return

    await fetch("/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: task })
    })

    input.value = ""

}