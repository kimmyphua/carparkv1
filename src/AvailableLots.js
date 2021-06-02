// import React, {useEffect, useState} from 'react';
// import Axios from 'axios';
// import AvailableLot from "./AvailableLot";
//
// import { Row, Col} from "react-bootstrap";
//
// import SearchForm from "./SearchForm";
//
// function AvailableLots() {
//
//     const [location, setLocation] = useState([])
//     const [text, setText] = useState('C20')
//     // const [car, setCar] = useState([])
//
//
//     useEffect(() => {
//
//         const getLocation = async () => {
//             const res = await Axios.get(`https://api.data.gov.sg/v1/transport/carpark-availability?`)
//             setLocation(res.data.items[0].carpark_data)
//             // console.log(res.data.items[0].carpark_data[0].carpark_number)
//         }
//         getLocation()
//
//     }, [text]);
//
//     let car = location.filter((dog) => dog.carpark_number === `${text}`)
//     console.log("car", car)
//     console.log("location", location)
//     // console.log("location", location.[0])
//     // console.log("address", address)
//
//
//     return (
//         <div className="App">
//
//                 <Row>
//                 <Col md={8}>
//                     <h4 className="bg-warning font-weight-light pb-5"> Enter the carpark number (eg:C20) to check for free lots  : </h4>
//                     < SearchForm className="text-danger" searchText={(text) => setText(text)}/>
//
//
//                         {car.map(({carpark_number, carpark_info}) => (
//
//                             <AvailableLot
//                                 carparkInfo={carpark_info}
//                                 carparkNumber={carpark_number}
//                             />
//                         ))}
//                 </Col>
//                 </Row>
//
//         </div>
//     );
// }
//
// export default AvailableLots;



