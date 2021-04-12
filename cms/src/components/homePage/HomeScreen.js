import { Container, Row, Col } from 'react-bootstrap'
import MiniDrawer from './Drawer'
export default function HomeScreen() {
    return <>
        <Container fluid>
            <Row>
                <Col>
                    <MiniDrawer />
                </Col>
            </Row>
        </Container>



    </>
}
