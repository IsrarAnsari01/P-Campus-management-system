const express = require('express');
const router = express.Router();
const container = require("./container")

router.get("/", container.getAllStudent)
router.post("/add-new", container.createNewStudent)
router.post("/login-user", container.loginSingleStudent)
router.get("/findSpecfic/:id", container.findSpecficUser)
router.post("/apply/:id", container.applyForJob)
router.post("/pull/:id", container.cancelAppliedJob)
router.post("/update/:id", container.updateUserInfo)
router.get("/:id", container.deleteSpecficStudent)
router.get("/remove-deleted-job-Information/:id", container.removeDeletedJobInformation)
router.post("/check-user-aleary-apply-for-this-job/:id", container.checkUserAlreadyApplyForThisJob)
module.exports = router;
