import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';

const Again = () => {
    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/order?email=${email}`
            const { data } = await axios.get(url);
            setOrders(data);
        }
        getOrders();
    }, [user])
    return (
        <div>
            <h1> Order List {orders.length} </h1>
        </div>
    );
};

export default Again;