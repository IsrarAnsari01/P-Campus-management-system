const studentModel = require("./studentModel")
const EncryptionPassword = require("../../encriptionPassword/EncryptionPassword")
module.exports.createNewStudent = function (req, res) {
    let userData = req.body.userData
    EncryptionPassword.EncryptionPassword(req.body.userData.password)
        .then(encryptedPassword => {
            userData.password = encryptedPassword
            return studentModel.createNewStudent(userData)
                .then(student => {
                    res.send({ status: true, student: student })
                })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to create new reader" })
        })
}

module.exports.getAllStudent = function (req, res) {
    studentModel.findMultipleWithQuery()
        .then(students => {
            res.send({ status: true, students: students })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find readers" })
        })

}

module.exports.loginSingleStudent = function (req, res) {
    studentModel.loginWithQuery(req.body.userData)
        .then(student => {
            res.send({ status: true, student: student })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find specific student" })
        })
}

module.exports.findSpecficUser = (req, res) => {
    const id = req.params.id
    studentModel.findSingleWithQuery(id)
        .then(student => {
            res.send({ status: true, student: student })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find Student" })
        })
}
module.exports.applyForJob = (req, res) => {
    const studentId = req.params.id
    let updatedData = {
        $push: {
            appliedJobs: {
                jobId: req.body.jobId,
                companyName: req.body.companyName,
                reqEducation: req.body.reqEducation,
                reqExprience: req.body.reqExprience,
                reqSkill: req.body.reqSkill,
                jobTitle: req.body.jobTitle
            }
        }
    }
    studentModel.updateSpecficStudent(studentId, updatedData)
        .then(sucess => {
            res.send({ status: true, updatedUser: sucess })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.cancelAppliedJob = (req, res) => {
    const studentId = req.params.id
    const reqestedId = req.body.id
    studentModel.updateSpecficStudentJobs(studentId, reqestedId)
        .then(success => {
            res.send({ status: true, updatedState: success })
            console.log("Success ==> ", success)
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.deleteSpecficStudent = (req, res) => {
    const id = req.params.id
    studentModel.deleteSingleWithQuery(id)
        .then(deleteUser => {
            res.send({ status: true, delUser: "Ok" })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find reader" })
        })
}
module.exports.updateUserInfo = (req, res) => {
    const studnetId = req.params.id
    const update = {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        skills: req.body.skills,
        education: req.body.education,
        exprience: req.body.exprience,
    }
    studentModel.updateStudentInformation(studnetId, update)
        .then(student => {
            res.send({ status: true, updatedStudent: student })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.removeDeletedJobInformation = (req, res) => {
    const jobId = req.params.id
    studentModel.removeDeletedJobsFromStudentCollection(jobId)
        .then(succ => {
            res.send({ status: true, deleted: succ })
        }).catch(err => {
            res.send({ status: false, deleted: err })
        })
}