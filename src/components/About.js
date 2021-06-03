import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Container} from "react-bootstrap";
import axios from "axios";

function About() {

    const [quote, setQuote] = useState([])

function Quote() {
    axios.get("https://api.quotable.io/random?")
        .then(res => {
            setQuote(res.data)
        })
}
    useEffect(() => {
        Quote()
    }, [])


    return (
        <div>
            <Container>
                <Card className="align-items-center">
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col md={4}>
                                    <img style={ {width: "80%"} } src="https://pusheen.com/wp-content/themes/pusheen-custom/img/about-pusheen.png"/>
                                </Col>
                                <Col md={6}>
                                    <h5 className="font-weight-light"><p>Hello, Thank you for using my App ♡ </p>
                                        <p>Here is a quote for you : </p>
                                        <p className="pink">{quote.content} </p>
                                        <p className="font-italic">-by {quote.author}</p></h5>
                                    <button onClick={Quote}>Get New Quote</button>

                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default About;
