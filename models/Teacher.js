const mongoose = require('mongoose');
const { isValidPassword, isValidEmail } = require('../middlewares/validate')

const teacherSchema = new mongoose.Schema({
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
    ContactInformation: {
        phoneNumber: String,
        address: {
            streetAddress: String,
            city: String,
            stateProvince: String,
            zipPostalCode: String
        }
    },
    AcademicBackground: {
        degreesObtained: [String],
        institutionsAttended: [String],
        certificationsAndLicenses: [String]
    },
    TeachingExperience: {
        subjectsTaught: [String],
        gradeLevelsTaught: [String],
        yearsOfExperience: Number,
        previousSchools: [String],
        currentEmploymentStatus: String // Full-Time, Part-Time, Unemployed, Self-Employed, etc.
    },
    Availability: {
        preferredWorkingHours: String,
        daysAvailable: [String]
    },
    TechnicalSkills: {
        onlineTeachingTools: [String],
        learningManagementSystems: [String]
    },
    CurriculumVitae: String,
    PersonalStatement: String,
    TeachingPhilosophy: String,
    CareerGoals: String,
    References: [{
        Name: String,
        ContactInformation: String,
        Relationship: String
    }],
    BackgroundCheckConsent: Boolean,
    Role: {
        type: String,
        enum: ['Student', 'Teacher'], //  possible roles
        required: true
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
