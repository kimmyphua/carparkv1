import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Container,Row, Col} from "react-bootstrap";
import Address from "./Address";
import SearchForm from "./SearchForm";
import img2 from "./images/img.png";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import mapStyles from "./mapStyles";
import Pagination from "./Pagination";


function Addresses() {

    function Map() {

        const [text, setText] = useState("woodlands")
        const [address, setAddress] = useState([])
        const [latLong, setLatLong] = useState([])
        // const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(10);

        const [selectedCenter, setSelectedCenter] = useState(null);


        useEffect(() => {

            function getAddress() {
               // let arr= !latLong.length ? [...latLong] : []
               //  console.log("arr", arr)
               //  console.log("latlong", latLong)
                 Axios.get(`https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&q=${text}`)
                    .then(res => {
                        // console.log(res.data.result.records )
                        setAddress(res.data.result.records)

                        res.data.result.records.forEach((add) => {
                             Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${add.address}&key=AIzaSyAKPMPbh_3SfeWejrnsrnbNaOdfEZboS4I`)
                                .then( res1 =>  {

                                    if(res1.data.results[0]) {

                                        setLatLong(prevState => [...prevState, res1.data.results[0].geometry.location])
                                        // console.log(`Latlong =  ${add.address}`, res1.data.results[0])
                                        // console.log("Latlong", res1.data.results[0].geometry.location)


                                    }


                                })

                        })

                    })
            }
            getAddress()


    }, [text])

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = address.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = pageNumber => setCurrentPage(pageNumber);
        console.log(currentPosts)
        // function displayMarker(){
        //
        // return(
        //         <Marker
        //             position={{
        //                 lat: lat,
        //                 lng: lng
        //             }}
        //
        //             icon={{
        //                 url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png",
        //                 scaledSize: new window.google.maps.Size(25, 25)
        //             }}
        //         />
        // )
        //
        //
        //
        // function removeMarker(){
        //
        //     return (
        //
        //         {latLong.map(({lat, lng}) => (
        //     <InfoWindow
        //         position={{
        //             lat: lat,
        //             lng: lng
        //         }}
        //         onCloseClick={() => {
        //         setLatLong([])
        //     }}
        //         >
        //         <div>
        //         <p>:(</p>
        //         </div>
        //         </InfoWindow>
        //             ))}
        //     )
        // }


        // console.log(address.address)
        // console.log("latlong", latlong.lng)
        return (
            <div>

                    <GoogleMap
                        defaultZoom={10}
                        defaultCenter={{lat: 1.3789, lng: 103.8536}}
                        defaultOptions={{styles: mapStyles}}
                    >

                        {latLong.map(({lat, lng}) => (
                            <Marker
                            position={{
                                lat: lat,
                                lng: lng
                            }}

                            icon={{
                                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png",
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                            onClick={ GoogleMap.defaultProps= {
                                center: {
                                    lat: lat,
                                    lng: lng
                                },
                                zoom: 12
                            }}
                            onDblClick={() => alert("OOpssss🤪")}
                            />
                        ))}

                        {/*{latLong && (*/}
                        {/*    <InfoWindow*/}
                        {/*    position={{ lat: latLong.lat, lng: latLong.lng }}*/}
                        {/*    onCloseClick={() => {*/}
                        {/*    setLatLong([])*/}
                        {/*}}*/}
                        {/*    >*/}
                        {/*    <div>*/}
                        {/*    <p>:(</p>*/}
                        {/*    </div>*/}
                        {/*    </InfoWindow>)}*/}


                        {/*{latLong.map(({lat, lng}) => (*/}
                        {/*        <InfoWindow*/}
                        {/*            position={{ lat: lat, lng: lng }}*/}
                        {/*            onCloseClick={() => {*/}
                        {/*                setLatLong([]);*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <div>*/}
                        {/*                <p>{address.address}</p>*/}
                        {/*            </div>*/}
                        {/*        </InfoWindow>))}*/}

                        {/*<InfoWindow*/}
                        {/*    // onCloseClick={() => {*/}
                        {/*    //     setLatLong(null);*/}
                        {/*    // }}*/}
                        {/*    position={{*/}
                        {/*        lat: lat,*/}
                        {/*        lng: lng*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    /!*<div>*!/*/}
                        {/*    /!*    <h2>{selectedPark.properties.NAME}</h2>*!/*/}
                        {/*    /!*    <p>{selectedPark.properties.DESCRIPTIO}</p>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*</InfoWindow>*/}

                    </GoogleMap>
            <Container fluid>
                <Row>
                    <Col md={4} lg={4} className="pt-5">
                        <h6 className="text-center border border-dark border-top-0 pink font-weight-light mt-5 pt-5 px-2">
                            Find your nearest carpark locations!
                            Key in your location to check if there are any available lots currently:
                        <SearchForm searchText={(text) => setText(text)}/></h6>

                        <img className="ml-5 mt-5" style={ {width: "60%"} } src="https://lh3.googleusercontent.com/proxy/8xUZSbwT0PNEeMSiW7MsenQsKb6ZGaWqIR24Kjc94hmP_S9aLy7hWAHdDhyvxVYhveStkKqEt1xLYE_k1cu3Kw" />
                    </Col>


                    <Col md={6} lg={6} className="pt-5">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={address.length}
                            paginate={paginate}
                        />
                        {currentPosts.map(({address, free_parking, car_park_type, car_park_no}) => (
                            <Address
                                address={address}
                                free_parking={free_parking}
                                car_park_type={car_park_type}
                                car_park_no={car_park_no}
                            />
                        ))}
                    </Col>

                </Row>
            </Container>
            </div>
        );
    }
    const MapWrapped = withScriptjs(withGoogleMap(Map));
    return (
        <div style={{ width: "100%", height: "300px" }}>
            <MapWrapped
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAKPMPbh_3SfeWejrnsrnbNaOdfEZboS4I'}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default Addresses;


