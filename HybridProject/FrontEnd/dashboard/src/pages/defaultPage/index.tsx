import React from "react";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "../../services/api-user-services";

const accessToken: any = getAccessToken();

const userInfo: any = jwtDecode(accessToken) as any;
console.log(userInfo)



const DefaultPage:React.FC = () => {
    return (
        <>
            <div style={{width: '100%', height: '100%', background: 'white', borderRadius: '5px', padding: '10px'}}>
                <div className="row">
                    <div className="col" >
                        <h4>FullName:</h4>
                        <span>{userInfo.Name} </span>
                        <span>{userInfo.Surname}</span>
                    </div>
                    <div className="col">
                        <h4>Email:</h4>
                        <span>{userInfo.Email}</span>
                    </div>
                    <div className="col">
                        <h4>Email Confirmed:</h4>
                        {userInfo.EmailConfirm ? <span style={{color: 'green'}}>Yes</span> : <span style={{color: 'red'}}>No</span>}
                    </div>
                    <div className="col">
                        <h4>PhoneNumber:</h4>
                        <span>{userInfo.PhoneNumber}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DefaultPage;