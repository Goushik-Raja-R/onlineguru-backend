const mongoose = require('mongoose');
const { isValidPassword, isValidEmail } = require('../middlewares/validate')

const studentSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isValidEmail, "Please Enter Valid Email"]
    },
    Password: {
        type: String,
        required: true,
        validate: [isValidPassword, "Minimum Password Length Is 6 Characters"]
    },
    Username: {
        type: String
    },
    ProfilePicture: {
        type: String
    },
    ContactNumber: {
        type: String
    },
    City: {
        type: String
    },
    State: {
        type: String
    },
    PreferredSubjects: [{
        type: String
    }],
    EducationLevel: {
        schoolOrCollege: {
            type: String
        },
        yearOfStudy: {
            type: Number
        },
        degree: {
            type: String
        }
    },
    Role: {
        type: String,
        enum: ['Student', 'Teacher'], //  possible roles
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
