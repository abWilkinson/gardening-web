import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { AuthAPI } from "../service/AuthService";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMesssage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isEmailInvalid = React.useMemo(() => {
        if (email === "") return false;
    
        return validateEmail(email) ? false : true;
      }, [email]);

    function getEmailFieldColour(): "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined {
        if (isEmailInvalid) {
            return "danger";
        } else if (email === "") {
            return "default";
        }
        return "success";
    }


    return (
        <div className="flex flex-wrap gap-4 justify-center">
            <div className="sm:w-1/2 w-full">Login with your email address and password.</div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="email" label="Email" placeholder="Enter your email" 
                value={email} 
                onValueChange={setEmail}
                errorMessage={isEmailInvalid && "Please enter a valid email"} 
                color={getEmailFieldColour()}
                isInvalid={isEmailInvalid}
                maxLength={50}
                />
            </div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="password" label="Password" placeholder="Enter your password."
                                value={password} 
                                onValueChange={setPassword}
                                maxLength={50}
                                />
            </div>

            <div className="sm:w-1/2 w-full">
                <Button color="primary" onPress={submitPressed} isDisabled={isButtonDisabled()} isLoading={loading}>
                    Submit
                </Button>
            </div>
            <div className="sm:w-1/2 w-full text-danger">
                {errorMesssage}
            </div>

        </div>
    )
    function isButtonDisabled(): boolean {
        return email === "" || password === "" || isEmailInvalid;
      }

        
    function submitPressed() {
        setLoading(true);
        AuthAPI.login(email, password).then(response => {
            setToken(response.data.jwtToken)
            navigate("/dashboard", { replace: true });
        }).catch(err => {
            if (err?.response?.data?.msg) {
                setErrorMessage(err.response.data.msg);
            } else {
                setErrorMessage("Something has gone wrong. Please try again later.")
            }
        }).finally(() => setLoading(false));
    }

  }


  export default Login
  