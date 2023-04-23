import React from 'react';
import { useParams } from 'react-router-dom';
import useServicesDetail from '../../../Hooks/useServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams()
    const [service] = useServicesDetail(serviceId)
    const [user] = useAuthState(auth);
    if (user) {
        console.log(user)
    }

    // const [user, setUser] = useState({
    //     name: 'titu',
    //     email: 'titu@too.com',
    //     address: 'tutunipur ',
    //     phone: 1111111111
    // })
    // const handleAddChange = event => {
    //     console.log(event.target.value);
    //     const { address, ...rest } = user;
    //     const newAddress = event.target.value;
    //     const newUser = { address: newAddress, ...rest }
    //     console.log(newUser, rest);
    //     setUser(newUser)
    // }
    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post(' http://localhost:5000/order ', order)
            .then(response => {
                const { data } = response
                if (data.insertedId) {
                    toast('Your order are booked')
                    event.target.reset()
                }
            })
    }
    return (
        <div onSubmit={handlePlaceOrder} className='w-50 mx-auto '>
            <h2>Please order : {service.name} </h2>
            <form >
                <input className='w-100 mt-2' type="text" name="name" value={user?.displayName} placeholder='name' id="" required />
                <br />
                <input className='w-100 mt-2' type="email" name="email" value={user?.email} placeholder='email' id="" required disabled readOnly />
                <br />
                <input className='w-100 mt-2' type="text" name="service" value={service.name} placeholder='service' id="" required disabled readOnly />
                <br />
                <input className='w-100 mt-2' type="text" name="address" placeholder='address' id="" autoComplete='off' required />
                <br />
                <input className='w-100 mt-2' type="text" name="phone" value={user.phone} placeholder='phone-number' id="" required />
                <br />
                <input className=' btn btn-primary mt-3' type="submit" value="place your order" />

            </form>
        </div>
    );
};

export default Checkout;