import { Card, CardHeader, CardBody, CardFooter, Avatar, Badge, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Device } from "../service/DeviceService";


function PiCard(props: Device) {
    const navigate = useNavigate();

    function editPressed() {
        navigate("/device", { replace: false, state: {
            mode: 'edit',
            device: props
        } });
    }

    function configPressed() {
        navigate("/config", { replace: false, state: {
            device: props
        } });
    }

    return (
        <>
            <Card className="max-w-[340px]">
                <CardHeader className="justify-between">
                    <div className="flex gap-5 w-full">
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{props.name}</h4>
                        </div>
                        <div className="ml-auto">
                            <Button isIconOnly variant="light" size="sm" onPress={editPressed}>
                                <img src="/edit.svg"/>
                            </Button>
                            <Button isIconOnly variant="light" size="sm" onPress={configPressed}>
                            <   img src="/cog.svg"/>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        {props.description}
                    </p>
                    <br />
                    <div className="flex py-2">
                        {props.temperature && 
                            <Badge content={props.temperatureValue} color="success" placement="top-right">
                                <Avatar isBordered radius="full" size="sm" src="/thermometer.svg" />
                            </Badge>
                        }
                        <Badge content={props.humidityValue} color="success" placement="top-right">
                            <Avatar isBordered radius="full" size="sm" src="/humidity.svg" className="fill-blue-500" />
                        </Badge>
                    </div>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className=" text-default-400 text-small">Data last recieved at:</p>
                        <p className="font-semibold text-default-400 text-small">{props.updateDate}</p>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default PiCard
