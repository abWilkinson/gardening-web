import { client } from "./BaseService"

interface DeviceRequest {
    id?: number
    name: string,
    description: string,
    temperature: boolean,
    humidity: boolean
}

export interface Device {
    id: number
    name: string,
    description: string,
    temperature: boolean,
    humidity: boolean,
    temperatureValue: string,
    humidityValue: string,
    updateDate: string
  }
  
export const DeviceAPI = {
    add: async function add(deviceRequest: DeviceRequest) {
        return await client.post("/device", deviceRequest);
    },

    update: async function update(deviceRequest: DeviceRequest) {
        return await client.put("/device", deviceRequest);
    },

    get: async function getAll() {
        return await client.get<Device[]>("/device");
    }
}