import { Input, Checkbox, CheckboxGroup, Button } from "@nextui-org/react";

import { useState } from "react";
import { Device, DeviceAPI } from "../service/DeviceService";
import { useLocation, useNavigate } from "react-router-dom";
interface AddPiProps {
    mode: "add" | "edit",
    device: Device
}
function DevicePage() {
    const navigate = useNavigate();
    const state:AddPiProps = useLocation().state;
    const [name, setName] = useState(state?.device ? state.device.name : "");
    const [desc, setDesc] = useState(state?.device ? state.device.description : "");
    const [humidity, setHumidity] = useState(state?.device ? state.device.humidity : false);
    const [temperature, setTemperature] = useState(state?.device ? state.device.temperature : false);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="sm:w-1/2 w-full">{state?.mode === "edit" ? "Update your device." : "Add a new device to your dashboard."}</div>
                <div className="sm:w-1/2 w-full">
                    <Input isRequired type="text" label="Name" placeholder="Enter a name for your device"
                        value={name}
                        onValueChange={setName}
                        maxLength={20} />
                </div>
                <div className="sm:w-1/2 w-full">
                    <Input isRequired type="text" label="Description" placeholder="A description for this device"
                        value={desc}
                        onValueChange={setDesc}
                        maxLength={50} />
                </div>
                <div className="sm:w-1/2 w-full">
                    <div className="w-full">
                        Select features you would like to implement
                    </div><br />
                    <div className="flex gap-4">
                        <Checkbox value="temperature" isSelected={temperature} onValueChange={setTemperature}>Temperature</Checkbox><br />
                        <Checkbox value="humidity" isSelected={humidity} onValueChange={setHumidity}>Humidity</Checkbox>
                    </div>
                </div>
                <div className="sm:w-1/2 w-full">
                    <Button color="primary" onPress={submitPressed} isDisabled={isButtonDisabled()} isLoading={loading}>
                        Submit
                    </Button>
                </div>
                <div className="sm:w-1/2 w-full text-danger">
                    {errorMessage}
                 </div>
            </div>

        </>
    )
    function isButtonDisabled(): boolean {
        return name === "" || desc === "";
    }
    function navigateToDashboard() {
        navigate("/dashboard", { replace: true });
    }
    function handleServerError(err: any) {
        if (err?.response?.data?.msg) {
            setErrorMessage(err.response.data.msg);
        } else {
            setErrorMessage("Something has gone wrong. Please try again later.")
        }
    }
    function submitPressed() {
        setLoading(true);
        if (state?.mode === "edit") {
            const id = state.device.id;
            DeviceAPI.update({id: id, name: name, description: desc, temperature: temperature, humidity: humidity}).then(response => {
                navigateToDashboard();
            }).catch(err => {
                handleServerError(err);
            }).finally(() => setLoading(false));
        } else {
            DeviceAPI.add({name: name, description: desc, temperature: temperature, humidity: humidity}).then(response => {
                navigateToDashboard();
            }).catch(err => {
                handleServerError(err);
            }).finally(() => setLoading(false));
        }
    }
}

export default DevicePage
