import { Card, CardHeader, CardBody, CardFooter, Avatar, Badge } from "@nextui-org/react";

interface PiCardProps {
    piName: string,
    piDesc: string
    piTemp: string,
    piHumid: string,
    dataDate: string
}
function PiCard(props: PiCardProps) {

    return (
        <>
            <Card className="max-w-[340px]">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{props.piName}</h4>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        {props.piDesc}
                    </p>
                    <div className="flex py-2">
                        <Badge content={props.piTemp} color="success" placement="top-right">
                            <Avatar isBordered radius="full" size="sm" src="/public/thermometer.svg" />
                        </Badge>
                        <Badge content={props.piHumid} color="success" placement="top-right">
                            <Avatar isBordered radius="full" size="sm" src="/public/humidity.svg" className="fill-blue-500" />
                        </Badge>
                    </div>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className=" text-default-400 text-small">Data last recieved at:</p>
                        <p className="font-semibold text-default-400 text-small">{props.dataDate}</p>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default PiCard
