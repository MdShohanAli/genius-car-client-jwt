import { useEffect, useState } from "react"

const useServicesDetail = serviceId => {
    const [service, setService] = useState({})
    useEffect(() => {
        const url = `https://genius-car-server-jwt-six.vercel.app/service/${serviceId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [serviceId])
    return [service]
}

export default useServicesDetail;