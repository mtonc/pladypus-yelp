import React from 'react';
import {Meteor} from 'meteor/meteor';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Hero from './Hero';
import BusinessGroup from './BusinessGroup';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(input) {
        Meteor.call('getResults', input, (error, result) => {
            if (error) {
                console.log(error);
            } else if (result) {
                this.setState({
                    results: result
                });
            }
        });
    }

    componentDidUpdate(props, state) {
        let results = document.querySelector(".results-section");
        // results.style.height = document.documentElement.scrollHeight;
    }

    render() {
        
        return (
            <div className="home">
                <section className="hero-section">
                    <Container fluid={true}>
                        <Row>
                            <Col>
                            <Hero yelpSearch={this.handleSearch}/>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="results-section" >
                    <Container>
                        <Row>
                            <Col>
                            <BusinessGroup businesses={this.state.results} />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

export default Home;