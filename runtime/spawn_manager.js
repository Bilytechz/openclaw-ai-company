const fs = require("fs")
const si = require("systeminformation")

async function manageAgents() {

    const cpu = await si.currentLoad()
    const mem = await si.mem()

    const cpuUsage = cpu.currentLoad
    const ramUsage = (mem.active / mem.total) * 100

    let maxAgents = 1

    if (cpuUsage < 30 && ramUsage < 40) {
        maxAgents = 6
    } else if (cpuUsage < 50 && ramUsage < 60) {
        maxAgents = 4
    } else if (cpuUsage < 70) {
        maxAgents = 2
    }

    const message = "Agent capacity set to: " + maxAgents + "\n"

    fs.appendFileSync(
        "logs/system.log",
        "Spawn manager: " + message
    )

}

setInterval(manageAgents, 20000)

console.log("Spawn manager started")