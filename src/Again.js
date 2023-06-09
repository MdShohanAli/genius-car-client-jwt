import React from 'react';
import { useState } from 'react';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axiosPrivate from './axiosPrivate/axiosPrivate';

const Again = () => {
    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `https://genius-car-server-jwt-six.vercel.app/order?email=${email}`
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch (error) {
                console.log(error.message);

                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth)
                    navigate('/login')
                }
            }

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