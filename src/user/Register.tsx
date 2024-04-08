import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { AuthAPI } from "../service/AuthService";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMesssage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isEmailInvalid = React.useMemo(() => {
        if (email === "") return false;
    
        return validateEmail(email) ? false : true;
      }, [email]);

      const isPasswordInvalid = React.useMemo(() => {
        if (password === "") return false;
    
        return password.length < 8;
      }, [password]);

      const isConfirmPasswordInvalid = React.useMemo(() => {
        if (confirmPassword === "") return false;
    
        return confirmPassword !== password;
      }, [confirmPassword]);

    function getEmailFieldColour(): "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined {
        if (isEmailInvalid) {
            return "danger";
        } else if (email === "") {
            return "default";
        }
        return "success";
    }

    function getPassordFieldColour(): "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined {
        if (isPasswordInvalid) {
            return "danger";
        } else if (password === "") {
            return "default";
        }
        return "success";
    }

    function getConfirmPassordFieldColour(): "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined {
        if (isConfirmPasswordInvalid) {
            return "danger";
        } else if (confirmPassword === "") {
            return "default";
        }
        return "success";
    }

    return (
        <form className="flex flex-wrap gap-4 justify-center">
            <div className="sm:w-1/2 w-full">To get started, please register with your email address and a password.</div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="email" label="Email" placeholder="Enter your email" 
                value={email} 
                onValueChange={setEmail}
                errorMessage={isEmailInvalid && "Please enter a valid email"} 
                color={getEmailFieldColour()}
                isInvalid={isEmailInvalid}
                maxLength={50}
                autoComplete="email"
                />
            </div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="password" label="Password" placeholder="Enter a password."
                                value={password} 
                                onValueChange={setPassword}
                                errorMessage={isPasswordInvalid && "Please enter a password of at least 8 characters."} 
                                color={getPassordFieldColour()} 
                                maxLength={50}
                                autoComplete="new-password"/>
            </div>
            <div className="sm:w-1/2 w-full">
                <Input isRequired type="password" label="Confirm Password" placeholder="Confirm your password."
                                value={confirmPassword} 
                                onValueChange={setConfirmPassword}
                                errorMessage={isConfirmPasswordInvalid && "Your passwords don't match."} 
                                color={getConfirmPassordFieldColour()} 
                                maxLength={50}
                                autoComplete="off"/>
            </div>
            <div className="sm:w-1/2 w-full">
                <Button color="primary" onPress={submitPressed} isDisabled={isButtonDisabled()} isLoading={loading}>
                    Submit
                </Button>
            </div>
            <div className="sm:w-1/2 w-full text-danger">
                {errorMesssage}
            </div>

        </form>
    )
    function isButtonDisabled(): boolean {
        return email === "" || password === "" || confirmPassword === "" || isEmailInvalid || isPasswordInvalid || isConfirmPasswordInvalid;
      }

        
    function submitPressed() {
        setLoading(true);
        AuthAPI.register(email, password).then(response => {
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


  export default Register
  