import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Container,
        Row,
        Col,
        } from "react-bootstrap";
import Address from "./Address";
import SearchForm from "./SearchForm";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";
import mapStyles from "../styles/mapStyles";
import Pagination from "./Pagination";
import mapStylesPink from "../styles/mapStylesPink";
import Music from "../Music";


function Addresses() {

    function refreshPage() {
        window.location.reload(false);
    }
    //lol this is my last resort

    function Map() {

        const [text, setText] = useState("null")
        const [address, setAddress] = useState([])
        const [latLong, setLatLong] = useState([])
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(10);
        const [showMusic, setShowMusic] = useState(false);

        //show Spotify Music

        const showSpotify = () => setShowMusic(true);


        //API calls
        function getAddress(other=false) {
            if(other){
                setLatLong([])
            }
            // let arr= !latLong.length ? [...latLong] : []
            //  console.log("arr", arr)
            //  console.log("latlong", latLong)
            Axios.get(`https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&q=${text}`)
                .then(res => {
                    setAddress(res.data.result.records)

                    res.data.result.records.forEach((add) => {
                        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${add.address}&key=AIzaSyAKPMPbh_3SfeWejrnsrnbNaOdfEZboS4I`)
                            .then( res1 =>  {
                                if(res1.data.results[0]) {
                                        setLatLong(prevState => [...prevState, res1.data.results[0].geometry.location])

                                }
                            })
                    })
                })
        }

        useEffect(() => {
            getAddress()
        }, [text])

        //Paginatiom

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = address.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = pageNumber => setCurrentPage(pageNumber);


        //Modal stuff for Google Maps it sucks but meh
        function showAddress(){
            alert("Showing all carparks for" + " " + text)
        }


        return (
            <div>
                    <GoogleMap
                        defaultZoom={10}
                        defaultCenter={{lat: 1.3789, lng: 103.8536}}
                        defaultOptions={{styles: mapStylesPink}}
                    >

                        {latLong.map(({lat, lng}, i) => (

                            <Marker
                                key={i}
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
                            onDblClick={() => showAddress()}
                            onRightClick={ () =>
                                    GoogleMap.defaultProps= {
                                        options: {
                                            styles: mapStyles
                                        }

                                    }}
                             />

                        ))}


                    </GoogleMap>

            <Container fluid>

                <Row>
                    <Col md={4} lg={4} className="pt-5">
                        <h6 className="text-center border border-dark border-top-0 pink font-weight-light mt-5 pt-5 px-2">

                            Find your nearest carpark locations!
                            Key in your location to check if there are any available lots currently:
                        <SearchForm text={text} searchText={setText}
                                    getAddress={getAddress}
                        />

                        <button className="pb-1 my-2" onClick={refreshPage}> Clear Markers </button>
                            <Row className="py-4 px-2 text-center">
                                <Col md={6}>
                                        <img onClick={showSpotify} className="twirl" style={ {width: "100%"} }
                                                src="https://lh3.googleusercontent.com/proxy/8xUZSbwT0PNEeMSiW7MsenQsKb6ZGaWqIR24Kjc94hmP_S9aLy7hWAHdDhyvxVYhveStkKqEt1xLYE_k1cu3Kw"
                                        />

                                </Col>
                                <Col md={6}>
                                    🎼 Click the Pink Car to enjoy some free tunes while browsing the App 🎼
                                </Col>
                            </Row>
                        </h6>
                        {showMusic ? <Music /> : null}

                    </Col>
                    <Col md={6} lg={6} className="pt-5">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={address.length}
                            paginate={paginate}
                        />
                        {currentPosts.map(({address, free_parking, car_park_type, car_park_no}, i) => (
                            <Address
                                key={i}
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
        <div style={{ width: "auto", height: "300px" }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default Addresses;


