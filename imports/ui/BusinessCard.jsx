import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

class BusinessCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            business: props.business,
        }
    }

    render() {
        const business = this.state.business;
        return (
            <Link to={"details/"+ business.id}>
                <Card className="business-card">
                    <Card.Img variant='top' src={business.image_url}/>
                    <Card.Body>
                        <Card.Title>{business.name}</Card.Title>
                        <StarRatingComponent 
                                    name="rating"
                                    value={business.rating}
                                    editing={false}
                                    starCount={5}
                                    starColor="#AA3939"
                                />
                        <Card.Text>
                            Reviews: {business.review_count}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        );
    }
}

export default BusinessCard;