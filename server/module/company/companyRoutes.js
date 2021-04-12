const express = require('express');
const router = express.Router();
const container = require("./container")

router.get("/", container.getAllCompanies)
router.post("/add-new", container.createNewCompany)
router.post("/login-company", container.loginSingleCompany)
router.get("/specficCompany/:id", container.findSpecficCompany)
router.get("/:id", container.deleteSpecficCompany)
// router.post("/post-job/:id", container.postNewJob)
// router.get("/alljobs", container.getAllCompaniesThatPostedJobs)

module.exports = router;
