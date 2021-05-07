const express = require('express');
const router = express.Router();
const container = require("./applyCandidatesContainer")

router.post("/", container.applyCandidate)
router.get("/:id", container.findSpecficCompanyPostedJobApplyCandidate)
router.get("/delete/:id", container.deleteSpecficCandidate)
router.get("/delete-specfic-job-candidates/:id", container.deleteSpecficJobCandidates)
// router.get("/:id", container.deleteSpecficJob)
// router.get("/findCompanyJob/:id", container.findSpecficCompanyJob)

module.exports = router;
