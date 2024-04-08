import { Button} from "@nextui-org/react";
import PiCard from "./PiCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Device, DeviceAPI } from "../service/DeviceService";
import { useAuth } from "../auth/AuthProvider";

function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    if (token) {
      DeviceAPI.get().then(resp => {
        setDevices(resp.data);
      })
    }
  }, []);
  
  return (
    <>
      <br />
      <div className="flex ">
        <Button color="primary" onClick={() => addPi()}>
          Setup new Pi
        </Button>
      </div>
      <div className="flex flex-wrap py-10 gap-6">
        {
          devices.map((device, key) => 
              <PiCard key={key} id={device.id} name={device.name} description={device.description} humidity={device.humidity} temperature={device.temperature}
              humidityValue="30%" temperatureValue={device.temperatureValue} updateDate="26-02-2024 02:00am" />
          )
        }
      </div>
      <div className="flex justify-center text-danger">
        {errorMessage}
      </div>

    </>
  )

  function addPi() {
    navigate("/device", { replace: true });
  }
}

export default Dashboard
