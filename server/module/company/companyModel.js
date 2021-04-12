const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const conformationEmail = require("./nodemailer/conformationEmail")
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const CompanySchema = new mongoose.Schema({
    companyName: String,
    companyEmail: String,
    companyOwnerName: String,
    companyCountry: String,
    companyCity: String,
    companyCetagory: String,
    password: String,
    addedOn: { type: String, default: TodayDate },

})


const CompanyModel = new mongoose.model('company', CompanySchema)

module.exports.createNewCompany = (companyDetails) => {
    return new Promise((resolve, reject) => {
        const newCompany = new CompanyModel(companyDetails)
        newCompany.save((err, company) => {
            if (err) {
                console.log("Unable to create new Student");
                console.log(err);
                reject(err);
            }
            conformationEmail.conformationEmailSenderToCompanyOwner(company.companyEmail)
                .then(succ => {
                    resolve(company);
                })
        })

    })
}
module.exports.findMultipleWithQuery = (query = {}) => {
    return new Promise((resolve, reject) => {
        CompanyModel.find(query)
            .then(companies => {
                resolve(companies)
            })
            .catch(err => {
                console.log("Unable to find companies, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.loginWithQuery = (companyDetails) => {
    return new Promise((resolve, reject) => {
        CompanyModel.findOne({ companyEmail: companyDetails.email })
            .then(company => {
                console.log(company)
                return bcrypt.compare(companyDetails.password, company.password, (err, isMatch) => {
                    if (!isMatch) {
                        console.log("Password dosno match")
                        return
                    }
                    resolve(company)
                })

            })
            .catch(err => {
                console.log("Unable to find company, query ", companyDetails);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        CompanyModel
            .findOne({ _id: query })
            .then(company => {
                resolve(company)
            })
            .catch(err => {
                console.log("Unable to find company ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.deleteSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        CompanyModel.deleteOne({ _id: query })
            .then(company => {
                resolve(company)
            })
            .catch(err => {
                console.log("Unable to Delete Student, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.updateCompanyinfo = (query, dataToBeUpdate) => {
    return new Promise((resolve, reject) => {
        CompanyModel.updateOne({ _id: query }, dataToBeUpdate)
            .then(company => {
                resolve(company)
            })
            .catch(err => {
                console.log("Unable to Delete Student, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.getThoseCompanyThatPostJobs = () => {

}
