import { Meteor } from 'meteor/meteor';
import yelp from 'yelp-fusion';
import Config from '/config.js'

const client = yelp.client(Config.yelpKey);

Meteor.startup(() => {

});

Meteor.methods({
    async getResults(query) {
        return client.search({
            term: query,
            location: 'napervilee, il',
            radius: 8000
        }).then(response => {
            return response.jsonBody.businesses;
        }).catch(error => {
            console.log(error);
            return error;
        })
    },

    async getDetails(id) {
        return client.business(id).then(response => {
            console.log(response);
            return response.jsonBody;
        }).catch(error =>{
            console.log(error);
            return error;
        })
    },

    async getReviews(id) {
        return client.reviews(id).then( response => {
            console.log(response);
            return response.jsonBody.reviews;
        }).catch(error => {
            console.log(error);
            return error;
        })
    }
});