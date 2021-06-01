import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import AppSettings from '../AppSettings';
export default function StudentSlider() {
    const settings = {
        className: "center",
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        speed: 5000,
        arrows: false,
        centerPadding: "60px",
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [students, setStudents] = useState([])
    useEffect(() => {
        getAllStudents()
    }, [])
    const dummyArray = [
        { fName: "Juniad", lName: "Khan", email: 'ju@gmail.com', skills: "Html, Css, React js", education: 'Intermediate', exprience: "freshers" },
        { fName: "Danial", lName: "Sheik", email: 'DS@gmail.com', skills: "Html, Css, Js", education: 'Intermediate', exprience: "freshers" },
        { fName: "Maxwell", lName: "Parkan", email: 'Mk@gmail.com', skills: "Html, Css, Docker", education: 'Intermediate', exprience: "freshers" },
        { fName: "Habib", lName: "Khan", email: 'HB@gmail.com', skills: "Html, Css, ReactNative", education: 'Intermediate', exprience: "freshers" },
    ]
    function getAllStudents() {
        axios.get(`${AppSettings.SERVER_URL_PORT}/student`)
            .then(succ => {
                setStudents(succ.data.students)
            }).catch(err => {
                console.log("Error in Fetching Students", err)
            })
    }
    const checkArray = () => {
        if (students.length <= 5) {
            dummyArray.forEach(arr => {
                students.push(arr)
            })
        }
    }
    return <>
        <Container className='pt-5 pb-5' fluid>
            <Row>
                <Col>
                    <Slider {...settings}>
                        {students && students.length > 5 ? students.map(stud =>
                            <div>
                                <Card className='mr-2 ml-4' style={{ borderTopRightRadius: '50px', borderBottomLeftRadius: '50px' }}>
                                    <Card.Header className='bg-light'>
                                        <Card.Title>
                                            <h2 className='text-center text-lead'> <b>{stud.fName} {stud.lName}</b></h2>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body >
                                        <ul className='list-group' style={{ boxShadow: "10px 10px 10px #b5b5b5", borderTopLeftRadius: '40px', borderBottomRightRadius: '40px' }}>
                                            <li className='list-group-item'> Email: <b>{stud.email}</b> </li>
                                            <li className='list-group-item'> Skills: <b>{stud.skills}</b> </li>
                                            <li className='list-group-item'> Education: <b>{stud.education}</b> </li>
                                            <li className='list-group-item'> Exprience: <b>{stud.exprience}</b> </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>) : <>
                            {checkArray()}
                        </>}
                    </Slider>
                </Col>
            </Row>
        </Container>


    </>
}
