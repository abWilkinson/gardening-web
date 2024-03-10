import { Input, Checkbox, CheckboxGroup, Button } from "@nextui-org/react";

import { useState } from "react";

function AddPi() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="sm:w-1/2 w-full">Add a new device to your dashboard.</div>
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
                    <CheckboxGroup
                        label="Select features you would like to implement"
                        orientation="horizontal"
                    >
                        <Checkbox value="temperature">Temperature</Checkbox>
                        <Checkbox value="humidity">Humidity</Checkbox>
                    </CheckboxGroup>
                </div>
                <div className="sm:w-1/2 w-full">
                <Button color="primary" onPress={submitPressed} isDisabled={isButtonDisabled()} isLoading={loading}>
                    Submit
                </Button>
            </div>
            </div>

        </>
    )
    function isButtonDisabled(): boolean {
        return name === "" || desc === "";
    }
    function submitPressed() {
        setLoading(true);

    }
}

export default AddPi
