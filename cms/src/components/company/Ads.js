import { Card } from 'react-bootstrap'
export default function Ads() {
    return <>
        <Card>
            <Card.Img variant="top" src="https://kinsta.com/wp-content/uploads/2017/12/wordpress-admin-1024x512.png" />
            <Card.Body>
                <Card.Title>WordPress</Card.Title>
                <hr />
                <Card.Text>
                    The WordPress admin dashboard, often called WP Admin or WP admin panel, is essentially the control panel for your entire WordPress website. It’s where you create and manage content,
                    add functionality in the form of plugins, change styling in the form of themes, and lots, lots more..
                </Card.Text>
                <a href='https://wordpress.org/' variant="primary" className = 'btn btn-block btn-primary text-white text-center'>Go to WordPress</a>
            </Card.Body>
        </Card>
        <Card className='mt-3'>
            <Card.Img variant="top" src="https://propakistani.pk/wp-content/uploads/2018/08/olx-carfirst.png" />
            <Card.Body>
                <Card.Title>OLX PAKISTAN</Card.Title>
                <hr />
                <Card.Text>
                    TOLX, the No. 1 app in auto classifieds and CarFirst, a leading used-car trading platform, are set to launch Pakistan’s first ever ‘Used Car Live Auction Platform’. The first used car live auction will take place at the 
                    ‘OLX CarFirst Car Bazaar’ happening at the Expo Center Karachi on the 12th of August 2018.
                </Card.Text>
                <a href='https://www.olx.com.pk/' className ='btn btn-block btn-primary text-white text-center'>Go to OLX</a>
            </Card.Body>
        </Card>





    </>
}