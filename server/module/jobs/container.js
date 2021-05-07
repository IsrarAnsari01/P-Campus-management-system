const jobModel = require("./jobModel")
module.exports.createNewJob = function (req, res) {
    let jobData = req.body.jobData
    jobModel.createNewJob(jobData)
        .then(job => {
            res.send({ status: true, job: job })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to create new Job" })
        })
}

module.exports.getAllJobs = function (req, res) {
    jobModel.findMultiplesWithQuery()
        .then(jobs => {
            res.send({ status: true, jobs: jobs })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find jobs" })
        })

}

module.exports.findSpecficCompanyJob = (req, res) => {
    const id = req.params.id
    jobModel.findMultipleWithQuery(id)
        .then(jobs => {
            res.send({ status: true, jobs: jobs })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find Student" })
        })
}
module.exports.deleteSpecficJob = (req, res) => {
    const id = req.params.id
    jobModel.deleteSingleWithQuery(id)
        .then(deletedJob => {
            res.send({ status: true, delUser: "Ok" })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find job" })
        })

}
module.exports.deleteAllJobsofSpecificCompany = (req,res) => {
    const companyId =  req.params.id
    jobModel.deleteMultipleWithQuery(companyId)
    .then(succ => {
        res.send({status: true, deleted: succ})
    }).catch(err => {
        res.send({status: false, deletedErr: err})
    })
}



module.exports.updateCompanyJobProfile = (req, res) => {
    const candidateId = req.params.id
    const companyName = req.body.commpanyName
    console.log(candidateId)
    console.log(companyName)
    // jobModel.findMultipleWithQuery(id)
    //     .then(jobs => {
    //         res.send({ status: true, jobs: jobs })
    //     })
    //     .catch(err => {
    //         res.send({ status: false, message: "Unable to find Student" })
    //     })
}