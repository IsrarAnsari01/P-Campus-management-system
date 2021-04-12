import { Carousel } from 'react-bootstrap'
export default function Slider() {
    return <>
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Find a Jobs here </h3>
                    <p>DON’T BE AFRAID TO START OVER. IT’S A BRAND-NEW OPPORTUNITY TO REBUILD WHAT YOU TRULY WANT.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>We Have More then 20 Companies</h3>
                    <p>THE FUTURE BELONGS TO THOSE WHO BELIEVE IN THE BEAUTY OF THEIR DREAMS</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Join us | We will help you to find a Job</h3>
                    <p>EVERY EXPERIENCE IN YOUR LIFE IS BEING ORCHESTRATED TO TEACH YOU SOMETHING YOU NEED TO KNOW TO MOVE FORWARD</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
}