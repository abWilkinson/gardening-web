import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import React from "react";
import { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isEmailInvalid = React.useMemo(() => {
        if (email === "") return false;
    
        return validateEmail(email) ? false : true;
      }, [email]);
      
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            <p>To get started, please register with your email address. sd as  sad sad sad asd asd asd asd asd asd sad as asd saaaaaaaaaaaaa saaaaaaaaaaaaaaaa assssssssssssssssss          as sa sa                        as as</p>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="email" label="Email" placeholder="Enter your email" 
                value={email} 
                onValueChange={setEmail}
                errorMessage={isEmailInvalid && "Please enter a valid email"} 
                color={isEmailInvalid ? "danger" : "success"}
                isInvalid={isEmailInvalid}
                />
            </div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="password" label="Password" placeholder="Enter a password" />
            </div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="password" label="Confirm Password" placeholder="Confirm your password" />
            </div>
            <div className="sm:w-1/2 w-full">
                <Button color="primary" onPress={submitPressed} isDisabled={isButtonDisabled()}>
                    Submit
                </Button>
            </div>

        </div>
    )
    function isButtonDisabled(): boolean {
        return email === "";
      }
    
      
  }

  function submitPressed() {
    console.log("hello");
  }


  export default Register
  