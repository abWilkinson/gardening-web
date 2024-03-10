import { Button} from "@nextui-org/react";
import PiCard from "./PiCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <br />
      <div className="flex ">
        <Button color="primary" onClick={() => addPi()}>
          Setup new Pi
        </Button>
      </div>
      <div className="flex flex-wrap py-10 gap-6">
        <PiCard piName="Greenhouse pi 1" piDesc="My first pi" piHumid="80%" piTemp="21" dataDate="23-02-2024 04:00am" />
        <PiCard piName="Garden pi 2" piDesc="My second pi" piHumid="30%" piTemp="12" dataDate="26-02-2024 02:00am" />
      </div>


    </>
  )

  function addPi() {
    navigate("/addPi", { replace: true });
  }
}

export default Dashboard
