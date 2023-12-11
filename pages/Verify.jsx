import OTPInput from "react-otp-input";
import React, { useEffect, useState } from "react";
import { SendSMS, checkEmail, resendVerificationCode, verifyEmail } from "./api/auth/APICalls";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import HeaderSignedIn from "@/Components/HeaderSignedIn";





function Verify() {
    // const email = localStorage.getItem('email')
    const router = useRouter();
    const { param } = router.query;   
    useEffect(() => {
        const isInitialVisit = localStorage.getItem('isInitialVisit');

        if(!isInitialVisit) {
            resendVerificationCode();
            SendSMS()
            localStorage.setItem('isInitialVisit', 'completed');
            
        }
        // checkEmail(email)
        // console.log("Redux Email ",email)
        // console.log("Sup",param)
    },[])

    const statusMessage = useSelector(state => state.data.statusMessage)
    const phoneVerified = useSelector(state => state.data.phoneVerified)
    const emailVerified = useSelector(state => state.data.emailVerified)
    const [OTP, setOTP] = useState("");
    const [phoneOTP, setphoneOTP] = useState("")
    function handleChange(OTP) {
        setOTP(OTP);
    }
    function handleChangePhone(phoneOTP) {
        setphoneOTP(phoneOTP)
    }
    const MyCustomInput = (props) => {
        return <input {...props} />;
    };
    return (
    <>
            <div style={{ backgroundColor: '#1B1C1F', display: 'grid'}}>
        
                <div className="verifyContainerRow">
                    <div className="verifyDiv" style={{ display: emailVerified ? "none" : "block"}}>
                        <p className="p1">Verify Email</p>
                        <p className="p2">
                            An OTP has been sent to your entered email
                        </p>
                        <div className="otpElements">
                            <p className="p3">Enter your Code here</p>
                            <div className="otp">
                                <OTPInput
                                    renderInput={MyCustomInput}
                                    onChange={handleChange}
                                    value={OTP}
                                    inputStyle="inputStyle"
                                    numInputs={6}
                                    separator={<span></span>}
                                />
                            </div>

                            <p className="p3">Didn't receive the code?</p>
                            <button onClick={()=>{
                                resendVerificationCode();
                            }} className="VerifyBttn" style={{width: 90, height: 40, marginTop: 10, backgroundColor: 'black', color: 'pink', fontSize: 15}}>Resend</button>
                        </div>
                        <button style={{backgroundColor: 'black', color: 'pink'}} onClick={()=>{
                            console.log("THe code", OTP)
                            verifyEmail(OTP)
                            setTimeout(() => {
                            if (statusMessage == 200){
                                router.push("/userProfile")
                            } else {
                                toast.error("Something went wrong please try again")
                            }
                            }, 1000);
                        }} className="VerifyBttn" type="submit">Verify</button>
                    </div>

                    <div className="verifyDiv" style={{ display: phoneVerified ? "none" : "block"}}>
                        <p className="p1">Verify Phone Number</p>
                        <p className="p2">
                            An OTP has been sent to your entered Phone Number
                        </p>
                        <div className="otpElements">
                            <p className="p3">Enter your Code here</p>
                            <div className="otp">
                                <OTPInput
                                    renderInput={MyCustomInput}
                                    onChange={handleChangePhone}
                                    value={phoneOTP}
                                    inputStyle="inputStyle"
                                    numInputs={6}
                                    separator={<span></span>}
                                />
                            </div>

                            <p className="p3">Didn't receive the code?</p>
                            <button onClick={()=>{
                                resendVerificationCode();
                            }} className="VerifyBttn" style={{width: 90, height: 40, marginTop: 10, backgroundColor: 'black', color: 'pink', fontSize:15}}>Resend</button>
                        </div>
                        <button style={{backgroundColor: 'black', color: 'pink'}} onClick={()=>{
                            console.log("THe code", OTP)
                            verifyEmail(OTP)
                            setTimeout(() => {
                            if (statusMessage == 200){
                                router.push("/userProfile")
                            } else {
                                toast.error("Something went wrong please try again")
                            }
                            }, timeout);
                        }} className="VerifyBttn" type="submit">Verify</button>
                        <button style={{backgroundColor: 'black', color: 'pink'}} onClick={()=>{router.push("/userProfile")}} className="VerifyBttn" type="submit">Skip</button>

                    </div>
                </div>
        </div>
    </>
    );
}

export default Verify;
