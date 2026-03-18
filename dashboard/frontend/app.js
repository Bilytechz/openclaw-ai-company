async function loadSystem() {

    const response = await fetch("/system")

    const data = await response.json()

    const agentsList = document.getElementById("agents")

    agentsList.innerHTML = ""

    data.agents.forEach(agent => {

        const li = document.createElement("li")
        li.textContent = agent

        agentsList.appendChild(li)

    })

}

loadSystem()