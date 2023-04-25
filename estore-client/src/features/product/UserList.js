import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import Container from "react-bootstrap/Container";
const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.fetchAllUser().then((response) => {
            setUsers(response?.data?.data);
        });
    }, []);
    console.log(users);

    const columns = [
        {
            label: "UserName",
            name: "username",
        },
        {
            label: "Email",
            name: "email",
        },
        {
            label: "Mobile",
            name: "mobile",
        },
        {
            label: "photo",
            name: "photo",
        },
        {
            label: "city",
            name: "city",
        },
    ];
    return (
        <>
            <Container>
                <h2>User Listing</h2>
                <table columns={columns} data={users} />
            </Container>
        </>
    );
}

export default UserList;