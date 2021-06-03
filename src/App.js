import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navigation from "./components/Navigation";
import Addresses from "./components/Addresses";
import img1 from "./images/clock.png";
import Axios from "axios";
import About from "./components/About";
import React, {useState, useEffect} from "react";
import {Container, Col, Row} from "react-bootstrap";




function Time() {
    const d = new Date()
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    const [time, setTime] = useState("");
    function getWeekDay(d) {

        let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = d.getDay();

        return weekdays[day];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const d = new Date()
            let time= ""
            if(d.getSeconds() < 10){
                time= d.getHours() + ":" + d.getMinutes() + ":" + "0" + d.getSeconds()
            } else if (d.getMinutes() < 10) {
                time = d.getHours() + ":" + "0" + d.getMinutes() + ":" +  d.getSeconds()
            } else {
                time= d.getHours() + ":"  + d.getMinutes() + ":" + d.getSeconds()
            }

            setTime(time)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return(
        <div> {date} , {getWeekDay(d)} <img width="40" height="40" src={img1}/> : {time}</div>
    )
}


function App() {


    return (

        <div>
            <BrowserRouter>

                    <Navigation/>

                <Switch>

                    <Route path="/" exact>

                        <Addresses/>
                        <Container fluid>
                        <Row>
                            <Col md={4} lg={4}>
                                <h4 className="border border-dark border-bottom-0 text-center pink mt-5 pt-3 px-2"> <Time /> </h4>
                            </Col>
                        </Row>
                        </Container>
                    </Route>
                    <Route path="/mystruggles" exact>
                        <About />
                    </Route>
                    {/*<Route path="/:term">*/}
                    {/*  <  />*/}
                    {/*</Route>*/}
                    <Route path="*">
                        Page is not found 404
                    </Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
