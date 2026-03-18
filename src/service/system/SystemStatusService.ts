import si from "systeminformation";
import prismaClient from "../../prisma/index";

class SystemStatusService {
    async execute() {
        const diskDB = await prismaClient.disk.findMany();
        const primaryDisk = diskDB.find(d => d.type === 'PRIMARY');

        const toGB = (bytes: number) => bytes / 1024 / 1024 / 1024;

        const cpu = await si.currentLoad(); // CPU %
        const cpuTemp = await si.cpuTemperature(); // CPU Temperatura
        const memory = await si.mem();         // RAM detalhado
        const disk = await si.fsSize();      // disco


        const cpuTemperature = cpuTemp.main && cpuTemp.main > 0 ? cpuTemp.main : null;

        
        const memoryUsed = toGB(memory.used);
        const memoryTotal = toGB(memory.total);
        const memoryPercent = (memory.used / memory.total) * 100;


        const storageDisk = disk.find(d => d.mount === primaryDisk?.path+":");
        if (!storageDisk) {
            throw new Error(`Disco ${primaryDisk?.path}: não encontrado`);
        }
        const diskUsed = toGB(storageDisk.used);
        const diskTotal = toGB(storageDisk.size);
        const diskPercent = storageDisk.use;

        return {
            cpu: {
                temp:cpuTemperature,
                percent: Number(cpu.currentLoad.toFixed(2))
            },
            memory: {
                used: Number(memoryUsed.toFixed(2)),
                total: Number(memoryTotal.toFixed(2)),
                percent: Number(memoryPercent.toFixed(2)),
                unit: "GB"
            },
            disk_primary: {
                disk:`${process.env.DISK_PRIMARY}:`,
                used: Number(diskUsed.toFixed(2)),
                total: Number(diskTotal.toFixed(2)),
                percent: Number(diskPercent.toFixed(2)),
                unit: "GB"
            }
        }
    }
}

export { SystemStatusService }