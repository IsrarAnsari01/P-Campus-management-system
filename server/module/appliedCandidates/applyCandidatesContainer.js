const candidateModel = require("./applyCandidatesModel")
module.exports.applyCandidate = function (req, res) {
    let candidate = req.body.candidate
    candidateModel.createNewCandidate(candidate)
        .then(candidate => {
            res.send({ status: true, candidate: candidate })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to create new candidate" })
        })
}

module.exports.findSpecficCompanyPostedJobApplyCandidate = function (req, res) {
    const companyInfo = req.params.id
    candidateModel.findSingleWithQuery(companyInfo)
        .then(details => {
            res.send({ status: true, details: details })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find specific candidate" })
        })

}
module.exports.deleteSpecficCandidate = (req, res) => {
    const candidateId = req.params.id
    candidateModel.deleteWithQuery(candidateId)
        .then(success => {
            res.send({ status: true, message: "Candidate Deleted Successfully" })
        })
        .catch(err => {
            res.send({ status: true, message: "Error in Deleting Candidate" })
        })
}
module.exports.deleteSpecficJobCandidates = (req, res) => {
    const jobId = req.params.id
    candidateModel.deleteMultipleJobCandidateWithQuery(jobId)
        .then(succ => {
            res.send({ status: true, deleted: succ })
        }).catch(err => {
            res.send({ status: false, deleted: err })
        })
}
module.exports.checkUserAlreadyApplyForThisJob = (req, res) => {
    const candidateId = req.params.id
    const jobId = req.body.jobId
    candidateModel.findWetherUserAlreadyApplyForThisJob(candidateId, jobId)
        .then(succ => {
            res.send({ apply: true, candidate: succ })
        }).catch(err => {
            res.send({ apply: false, err: err })
        })
}
// module.exports.findSpecficCompanyJob = (req, res) => {
//     const id = req.params.id
//     jobModel.findMultipleWithQuery(id)
//         .then(jobs => {
//             res.send({ status: true, jobs: jobs })
//         })
//         .catch(err => {
//             res.send({ status: false, message: "Unable to find Student" })
//         })
// }
// module.exports.deleteSpecficJob = (req, res) => {
//     const id = req.params.id
//     jobModel.deleteSingleWithQuery(id)
//         .then(deletedJob => {
//             res.send({ status: true, delUser: "Ok" })
//         })
//         .catch(err => {
//             res.send({ status: false, message: "Unable to find job" })
//         })

// }
// module.exports.updateCompanyJobProfile = (req, res) => {
//     const candidateId = req.params.id
//     const companyName = req.body.commpanyName
//     console.log(candidateId)
//     console.log(companyName)
//     // jobModel.findMultipleWithQuery(id)
//     //     .then(jobs => {
//     //         res.send({ status: true, jobs: jobs })
//     //     })
//     //     .catch(err => {
//     //         res.send({ status: false, message: "Unable to find Student" })
//     //     })
// }