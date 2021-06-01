const companyModel = require("./companyModel")
const EncryptionPassword = require("../../encriptionPassword/EncryptionPassword")
module.exports.createNewCompany = function (req, res) {
    let companyData = req.body.companyData
    EncryptionPassword.EncryptionPassword(req.body.companyData.password)
        .then(encryptedPassword => {
            companyData.password = encryptedPassword
            return companyModel.createNewCompany(companyData)
                .then(company => {
                    res.send({ status: true, company: company })
                })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to create new Company" })
        })
}

module.exports.getAllCompanies = function (req, res) {
    companyModel.findMultipleWithQuery()
        .then(compines => {
            res.send({ status: true, compines: compines })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find Compines" })
        })

}

module.exports.loginSingleCompany = function (req, res) {
    companyModel.loginWithQuery(req.body.userData)
        .then(company => {
            res.send({ status: true, company: company })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find specific Comapny" })
        })
}

module.exports.findSpecficCompany = (req, res) => {
    const id = req.params.id
    companyModel.findSingleWithQuery(id)
        .then(company => {
            res.send({ status: true, company: company })
        })
        .catch(err => {
            res.send({ status: false, message: `Unable to find Company ${err}` })
        })
}
module.exports.deleteSpecficCompany = (req, res) => {
    const id = req.params.id
    companyModel.deleteSingleWithQuery(id)
        .then(deleteUser => {
            res.send({ status: true, delUser: "Ok" })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find reader" })
        })
}
