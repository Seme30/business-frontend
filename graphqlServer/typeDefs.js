const { gql } = require('apollo-server');

const typeDefs = gql`
  type Business {
    id: ID!
    name: String!
    category: Category!
    campaigns: [Campaign!]!
    locations: [Location!]!
    externalSystemInstallations: [ExternalSystemInstallation!]!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Campaign {
    id: ID!
    name: String!
    budget: Float!
  }

  type Location {
    id: ID!
    latitude: Float!
    longitude: Float!
  }

  type ExternalSystem {
    id: ID!
    name: String!
    provider: String!
    baseUrl: String!
  }

  type ExternalSystemInstallation {
    id: ID!
    encryptedPrivateApiKey: String!
  }

  type Query {
    businesses: [Business!]!
    categories: [Category!]!
    campaigns: [Campaign!]!
    locations: [Location!]!
    externalSystems: [ExternalSystem!]!
    externalSystemInstallations: [ExternalSystemInstallation!]!
  }
`;

module.exports = typeDefs
