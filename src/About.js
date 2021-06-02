import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";

function About(props) {
    const [image, setImg] = useState([])
    axios.get("https://api.unsplash.com/photos/random/?client_id=M7ulFsyMP2UlXohtlFo5v7Xd7BmszcSrhnlNRL6vp78")
        .then(res => {
            setImg(res.data.urls.regular)
        })
    return (
        <div>
            Hello Thank you for using my App :)
            <img src={image} />

            <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default About;
