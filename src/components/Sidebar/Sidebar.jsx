import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
export default function Sidebar() {
    const navigate = useNavigate();
    let id = localStorage.getItem('userDetails');
    let token = localStorage.getItem('token');
    useEffect(() => {
        if (token !== null) {
            fetch(`/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }).then(
                (resp) => {
                    if (resp.status !== 200) {
                        window.location.href = "/";
                    }
                    else {
                        resp.json().then((result) => {
                            // console.log("nsjfdj")
                            // console.log("Admin", result)
                            // console.log(result.category)
                            // // setDetails(result);
                            // setprofilePic(result.profileimage);

                        });
                    }
                })
        }
        else {
            window.location.href = "/";
        }



    }, [])
    return (
        <div>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
    )

    async function logout() {
        // Clear token (if applicable)
        localStorage.removeItem('token');
        window.localStorage.clear();
        localStorage.clear();
        navigate('/')
        // Display a logout confirmation message or perform any other necessary actions
    };

}