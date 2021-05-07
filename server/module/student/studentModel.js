const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const conformationEmail = require("../../nodemailer/conformationEmail")
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const StudentSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: { type: String },
    skills: String,
    education: String,
    exprience: String,
    password: String,
    addedOn: { type: String, default: TodayDate },
    appliedJobs: [
        {
            jobId: mongoose.Schema.Types.ObjectId,
            companyName: String,
            jobTitle: String,
            reqEducation: String,
            reqExprience: String,
            reqSkill: String,
        }
    ]
})


const studentModel = new mongoose.model('students', StudentSchema)

module.exports.createNewStudent = (studentDetails) => {

    return new Promise((resolve, reject) => {
        const newStudent = new studentModel(studentDetails)
        newStudent.save((err, student) => {
            if (err) {
                console.log("Unable to create new Student");
                console.log(err);
                reject(err);
            }
            conformationEmail.conformationEmailSender(student.email)
                .then(succ => {
                    resolve(student);
                })
        })

    })
}
module.exports.findMultipleWithQuery = (query = {}) => {
    return new Promise((resolve, reject) => {
        studentModel.find(query)
            .then(reader => {
                resolve(reader)
            })
            .catch(err => {
                console.log("Unable to find reader, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.loginWithQuery = (studentDetails) => {
    return new Promise((resolve, reject) => {
        studentModel.findOne({ email: studentDetails.email })
            .then(student => {
                return bcrypt.compare(studentDetails.password, student.password, (err, isMatch) => {
                    if (!isMatch) {
                        console.log("Password does not match")
                        return
                    }
                    resolve(student)
                })

            })
            .catch(err => {
                console.log("Unable to find readers, query ", err);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        studentModel.findOne({ _id: query })
            .then(reader => {
                resolve(reader)
            })
            .catch(err => {
                console.log("Unable to find reader, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.updateSpecficStudent = (query, data) => {
    return new Promise((rej, res) => {
        studentModel.updateOne({ _id: query }, data)
            .then(updatedStudent => {
                res(updatedStudent)
            }).catch(err => {
                console.lg("Something went Wrong Error in Updating data", err)
                rej(err)
            })
    })
}
module.exports.updateSpecficStudentJobs = (query, reqestedId) => {
    return new Promise((rej, res) => {
        studentModel.update(
            { _id: query },
            { $pull: { appliedJobs: { jobId: reqestedId } } },
            { multi: true },
        )
            .then(updatedStudent => {
                res(updatedStudent)
            }).catch(err => {
                console.log("Something went Wrong Error in Updating data", err)
                rej(err)
            })
    })
}
module.exports.deleteSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        studentModel.deleteOne({ _id: query })
            .then(student => {
                resolve(student)
            })
            .catch(err => {
                console.log("Unable to Delete Student, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.updateStudentInformation = (query, dataToBeUpdate) => {
    return new Promise((rej, res) => {
        studentModel.updateOne({ _id: query }, dataToBeUpdate)
            .then(succ => {
                res(succ)
            }).catch(err => {
                console.log("Error in updating data ", err)
                rej(err)
            })

    })
}
module.exports.removeDeletedJobsFromStudentCollection = (jobId) => {
    return new Promise((res, rej) => {
        studentModel.updateMany(
            {},
            { $pull: { appliedJobs: { jobId: jobId } } },
            { multi: true },
        )
            .then(removedJobDeleted => {
                res(removedJobDeleted)
            }).catch(err => {
                console.log("Something went Wrong Error in removedJobDeleted", err)
                rej(err)
            })
    })
}
