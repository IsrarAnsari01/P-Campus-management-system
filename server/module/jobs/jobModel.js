const mongoose = require('mongoose');
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const JobSchema = new mongoose.Schema({
    jobTitle: String,
    jobPosition: String,
    reqSkills: String,
    education: String,
    exprience: String,
    salary: String,
    commpanyName: String,
    companyLocation: String,
    addedOn: { type: String, default: TodayDate },
    companyInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    }
})


const JobModel = new mongoose.model('Jobs', JobSchema)

module.exports.createNewJob = (jobDetails) => {

    return new Promise((resolve, reject) => {
        const newJob = new JobModel(jobDetails)
        newJob.save((err, job) => {
            if (err) {
                console.log("Unable to create new Job", err);
                reject(err);
                return
            }
            resolve(job);
        })

    })
}
module.exports.findMultiplesWithQuery = (query = {}) => {
    return new Promise((resolve, reject) => {
        JobModel.find(query)
            .then(jobs => {
                resolve(jobs)
            })
            .catch(err => {
                console.log("Unable to find jobs, query ", query);
                reject(err)
            })
    })
}

module.exports.findMultipleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        JobModel.find({ companyInfo: query })
            .populate("companyInfo")
            .then(jobs => {
                resolve(jobs)
            })
            .catch(err => {
                console.log("Unable to find jobs, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.deleteSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        JobModel.deleteOne({ _id: query })
            .then(student => {
                resolve(student)
            })
            .catch(err => {
                console.log("Unable to Delete Student, query ", query);
                reject(err)
            })
    })
}
module.exports.deleteMultipleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        JobModel.deleteMany({ companyInfo: query })
            .then(deletedJobs => {
                resolve(deletedJobs)
            })
            .catch(err => {
                console.log("Unable to Delete Jobs, query ", query);
                reject(err)
            })
    })
}

