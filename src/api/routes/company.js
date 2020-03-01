const express = require('express');
const router = express.Router();
const CompanyController = require('../../controller/company');

router.post('/', async (req, res, next) => {
  const company = {
    name: req.body.name,
    registration_no: req.body.registration_no,
    address: req.body.address,
    phone_no: req.body.phone_no,
    website: req.body.website
  };
  try {
    await CompanyController.insert(company);
    return res.status(201).json({
      message: 'Post request on company',
      params: company
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    registration_no: req.body.registration_no
  };
  try {
    const company = await CompanyController.select(params);
    return res.status(200).json({
      message: 'Get request on company',
      result: company,
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.patch('/', async (req, res, next) => {
  const params = {
    registration_no: req.body.registration_no,
    name: req.body.name,
    address: req.body.address,
    phone_no: req.body.phone_no,
    website: req.body.website
  };
  try {
    await CompanyController.update(params);
    return res.status(200).json({
      message: 'Patch request on company',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    registration_no: req.body.registration_no
  };
  try {
    await CompanyController.delete(params);
    return res.status(200).json({
      message: 'Delete request on company',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
