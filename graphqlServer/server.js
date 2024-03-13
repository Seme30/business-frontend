const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const _ = require('lodash');
const typeDefs = require('./typeDefs')

const categories = JSON.parse(fs.readFileSync('./db/categories.json'));
const businesses = JSON.parse(fs.readFileSync('./db/businesses.json'));
const businessesCategories = JSON.parse(fs.readFileSync('./db/businessesCategories.json'));
const campaigns = JSON.parse(fs.readFileSync('./db/campaigns.json'));
const locations = JSON.parse(fs.readFileSync('./db/locations.json'));
const externalSystems = JSON.parse(fs.readFileSync('./db/externalSystems.json'));
const externalSystemInstallations = JSON.parse(fs.readFileSync('./db/externalSystemInstallations.json'));

const resolvers = {
  Query: {
    businesses: () => businesses,
    categories: () => categories,
    campaigns: () => campaigns,
    locations: () => locations,
    externalSystems: () => externalSystems,
    externalSystemInstallations: () => externalSystemInstallations,
  },
  Business: {
    category: (parent) => {
      return categories.find(category => category.id === _.find(businessesCategories, { businessId: parent.id }).categoryId);
    },
    campaigns: (parent) => {
      return campaigns.filter(campaign => campaign.businessId === parent.id);
    },
    locations: (parent) => {
      return locations.filter(location => location.businessId === parent.id);
    },
    externalSystemInstallations: (parent) => {
      return externalSystemInstallations.filter(installation => installation.businessId === parent.id);
    },
  },
};

const server = new ApolloServer(
  { 
    typeDefs,
    resolvers,
    plugins: [
      {
        requestDidStart(requestContext) {
          console.log('Request started! Query:\n' +
            requestContext.request.query);
          return {
            willSendResponse(requestContext) {
              console.log('Will send response');
              console.log('Response:', JSON.stringify(requestContext.response.data, null, 2));
            },            
          };
        },
      },
    ],
  }
);


server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
