import React from 'react';
import { Meteor } from 'meteor/meteor';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { StaticGoogleMap, Marker } from 'react-static-google-map';
import StarRatingComponent from 'react-star-rating-component';
import Hours from './Hours';
import Carousel from 'react-bootstrap/Carousel';
import Config from '/config';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id: props.match.params.id,
            business: null,
            reviews: null,
        }
    }

    componentDidMount() {
        Meteor.call('getDetails', this.state.id, (error, result) => {
            if (error) {
                console.log(error);
            } else if (result) {
                this.setState( {
                    id: this.state.id,
                    business: result,
                    reviews: this.state.reviews
                });
            }
        });

        Meteor.call('getReviews', this.state.id, (error, result) => {
            if (error) {
                console.log(error);
            } else if (result) {
                this.setState( {
                    id: this.state.id,
                    business: this.state.business,
                    reviews: result
                });
            }
        });
    }

    render() {
        const business = this.state.business;
        const reviews = this.state.reviews;

        if  ( business === null || reviews === null) {
            return (
                <Container className="details">
                    <div className='icon-wrap'>
                        <img className="loading-icon" src="/images/loading.png"/>
                    </div>
                </Container>
            )
        }
        else {
            let location = "";
            const regEx = /\s/
            const openClosed = business.is_closed ? <span className="closed">Closed'</span> : <span className="open">Open Now</span>;
            const categories = business.categories.map( (category) => {
                return <span className="category" key={"category-" + category.alias} >{category.title}</span>
            });
            const address = business.location.display_address.map( (line) =>
                <span className="address-line" key={line}>{line}</span>
            );
            const photos = business.photos.map( (photo) => {
                return (
                    <Carousel.Item key={photo}>
                        <Image src={photo} key={"image-" + photo} rounded  />
                    </Carousel.Item>
                );
            });
            const reviewsDisplay = reviews.map( (review) => {
                return (
                    <div className="single-review" key={review.id}>
                        <StarRatingComponent 
                            name="rating"
                            value={review.rating}
                            editing={false}
                            starCount={5}
                        />
                        <p>
                            {review.text}
                        </p>
                        <span className="author"><em>{review.user.name}</em></span>
                    </div>
                );
            });

            for (const line of business.location.display_address) {
                console.log(line)
                location += (line + ', ');
            }
            const directionsLink = "https://www.google.com/maps/dir/?api=1&query=" + encodeURI(location.replace(regEx, '+')) ;
            
            return (  
                <div  className="details">
                    <Container>
                        <Row>
                            <Col className="header">
                                <h1>{business.name}</h1>
                                <StarRatingComponent 
                                    name="rating"
                                    value={business.rating}
                                    editing={false}
                                    starCount={5}
                                />
                                <div>
                                    <span className="price">{business.price}</span>
                                    <span className="categories">{categories}</span>
                                    <span className="status">
                                        {openClosed}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="map-wrap" lg={5} md={5} sm={12}>
                                <StaticGoogleMap size="600x600" apiKey={Config.mapsKey} zoom="12">
                                    <Marker  location={location} color="red" />
                                </StaticGoogleMap> 
                            </Col>
                            <Col  className="carousel-wrap" lg={7} md={7}  sm={12}>
                                <Carousel >
                                    {photos}
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid={true}>
                        <Row className="business-details"> 
                            <Col className="contact-info" lg={4} md={4} sm={12}>
                                <div className="phone">
                                    <label>
                                        Phone:
                                    </label>
                                    <span className="number"><a href={"tel:"+business.phone} target="_blank" rel="nofollow">{business.display_phone}</a></span>
                                </div>
                                <div className="address">
                                    <label>Address:</label>
                                     {/* <a href={directionsLink} target="_blank" rel="nofollow" >{address}</a> */}
                                     {address}
                                </div>
                                <Hours hours= {business.hours[0].open}/>
                            </Col>
                            <Col className="reviews" lg={8} md={8} sm={12}>
                                {reviewsDisplay}
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default Details;