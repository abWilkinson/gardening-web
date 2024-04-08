import { Input, Checkbox, CheckboxGroup, Button, Card, CardBody, Tab, Tabs, Code, Snippet } from "@nextui-org/react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface DeviceConfigProps {
}
function DeviceConfigPage() {
    const navigate = useNavigate();
    const state: DeviceConfigProps = useLocation().state;


    return (
        <>
            <div className="flex w-full flex-col">
                <br />
                <Tabs aria-label="Options">
                <Tab key="device" title="Device Configuration">
                        <Card>
                            <CardBody>
                                Configure the settings for your device. <br/><br/>
                                <div className="w-full">
                                    Unique deviceId for API authentication:
                                    </div>
                                    <div className="w-full">
                                    <Snippet hideSymbol>sdfsdfsdferwerwerwerwerwer</Snippet>
                                </div>
                                
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="temperature" title="Temperature">
                        <Card>
                            <CardBody>
                                Configure the settings for recording temperatures from your device. <br/><br/>
                                <div className="flex w-full">

                                </div>
                                
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="humidity" title="Humidity">
                        <Card>
                            <CardBody>
                                Configure the settings for recording humidity from your device. <br/><br/>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>

        </>
    )

}

export default DeviceConfigPage
