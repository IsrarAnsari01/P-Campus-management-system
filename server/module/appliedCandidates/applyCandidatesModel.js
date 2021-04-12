const mongoose = require('mongoose');
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const ApplyCandidateSchema = new mongoose.Schema({
    jobInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs"
    },
    candidateInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    },
    companyInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    },
    companyName: String,
    jobTitle: String,
    addedOn: { type: String, default: TodayDate }
})


const ApplyCandidateModel = new mongoose.model('ApplyCandidates', ApplyCandidateSchema)
module.exports.createNewCandidate = (candidateDetails) => {

    return new Promise((resolve, reject) => {
        const newCandidate = new ApplyCandidateModel(candidateDetails)
        newCandidate.save((err, candidate) => {
            if (err) {
                console.log("Unable to create new candidate", err);
                reject(err);
                return
            }
            resolve(candidate);
        })

    })
}
module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        ApplyCandidateModel.find({ companyInfo: query })
            .populate("candidateInfo")
            .then(candidate => {
                resolve(candidate)
            })
            .catch(err => {
                console.log("Unable to find jobs, query ", query);
                reject(err)
            })
    })
}
module.exports.deleteWithQuery = (candidateId) => {
    return new Promise((resolve, reject) => {
        ApplyCandidateModel.deleteOne({ _id: candidateId })
            .populate("candidateInfo")
            .then(candidate => {
                resolve(candidate)
            })
            .catch(err => {
                console.log("Unable to delete cadidate, query ", err);
                reject(err)
            })
    })
}



