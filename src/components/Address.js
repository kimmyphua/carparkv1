import React, {useEffect, useState} from 'react';
import {Col, Table, Row} from 'react-bootstrap'
import SearchForm from "./SearchForm";
import Axios from "axios";
import AvailableLot from "./AvailableLot";

function Address({address, free_parking, car_park_type, car_park_no}) {
    const [location, setLocation] = useState([])
    const [text, setText] = useState('C20')

    useEffect(() => {

        const getLocation = async () => {
            const res = await Axios.get(`https://api.data.gov.sg/v1/transport/carpark-availability?`)
            setLocation(res.data.items[0].carpark_data)
            // console.log(res.components.items[0].carpark_data[0].carpark_number)
        }
        getLocation()

    }, [text]);

    let car = location.filter((dog) => dog.carpark_number === `${car_park_no}`)

    return (
        <div>
            <Row className="border-bottom border-5">

            <Col md={8}>
                    <p className="font-weight-bold" >Address: {address} </p>
                    <p className="font-weight-light">Free Parking?: {free_parking}</p>
                    <p className="font-weight-light">Car Park Type: {car_park_type}</p>
                    <p className="font-weight-light">Car Park Number: {car_park_no}</p>
            </Col>
                <Col md={4}>
                    {car.map(({ carpark_info}) => (
                        <AvailableLot
                            carparkInfo={carpark_info}
                        />
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default Address;
