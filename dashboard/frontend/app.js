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
        li.textContent = agent
        agentsList.appendChild(li)

    })

    status.textContent = data.status
    tasks.textContent = data.tasks
    logs.textContent = data.logs

}

loadSystem()

setInterval(loadSystem, 3000)