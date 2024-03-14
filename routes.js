const express = require('express');
const fs = require('fs');
const _ = require('lodash');

const categories = JSON.parse(fs.readFileSync('./db/categories.json'));
const businesses = JSON.parse(fs.readFileSync('./db/businesses.json'));
const businessesCategories = JSON.parse(fs.readFileSync('./db/businessesCategories.json'));
const campaigns = JSON.parse(fs.readFileSync('./db/campaigns.json'));
const locations = JSON.parse(fs.readFileSync('./db/locations.json'));
const externalSystems = JSON.parse(fs.readFileSync('./db/externalSystems.json'));
const externalSystemInstallations = JSON.parse(fs.readFileSync('./db/externalSystemInstallations.json'));

const router = express.Router()

router.get('/businesses', (req, res) => {
  res.json(businesses);
});

router.get('/businessesCat', (req, res) => {
    console.log("businessesCat")
        const result = businesses.map(business => {

          const category = categories.find(category => category.id === _.find(businessesCategories, { businessId: business.id }).categoryId);
    
          const businessCampaigns = campaigns.filter(campaign => campaign.businessId === business.id);

          return {
            ...business,
            category,
            campaigns: businessCampaigns
          };
        });
      
        res.json(result);
    
})

router.get('/businesses/:id', (req, res) => {
    console.log(req.params.id)
  const business = businesses.find(b => {
    return b.id == req.params.id
  });
  if (!business) {
    return res.status(404).json({ error: 'Business not found' });
  }

  business.category = categories.find(category => category.id === _.find(businessesCategories, { businessId: business.id }).categoryId);
  business.campaigns = campaigns.filter(campaign => campaign.businessId === business.id);
  business.locations = locations.filter(location => location.businessId === business.id);
  business.externalSystemInstallations = externalSystemInstallations.filter(installation => installation.businessId === business.id);
  business.externalSystems = business.externalSystemInstallations.map(installation => {
    return externalSystems.find(externalSystem => externalSystem.id === installation.externalSystemId);
  });

  res.json(business);
});

module.exports = router;
