import React from 'react';
import BusinessCard from './BusinessCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';

function BusinessGroup(props) {
    const businesses = props.businesses || [];
    const group = businesses.map( (business) =>
        <BusinessCard business={business} key={business.id} />
   );
   if (businesses.length < 1) {
       return  (
        <div className="business-group">
                    <h1 className="no-results">No Results</h1>
        </div>
       )
   };
    return (
        <div className="business-group">
                <h1>Results</h1>
                <CardColumns>
                    {group} 
                </CardColumns>
        </div>
    )
}

export default BusinessGroup;