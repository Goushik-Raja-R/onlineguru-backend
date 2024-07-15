const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher')
const key = '123456789112345dfg';
const encryptor = require('simple-encryptor')(key);

exports.StudentCreation = async (req, res) => {
    const { FullName, Email, Password, Username, ProfilePicture, ContactNumber, City, State, PreferredSubjects, EducationLevel,Role } = req.body;

    const ExistingStudent = await Student.findOne({ Email });

    if (ExistingStudent) {
        return res.status(400).json({ status: false, message: "Student Data Already Exists in DB" });
    }

    try {
        const encryptedPassword = encryptor.encrypt(Password);
        const newStudent = new Student({
            FullName,
            Email,
            Password: encryptedPassword,
            Username,
            ProfilePicture,
            ContactNumber,
            City,
            State,
            PreferredSubjects,
            EducationLevel,
            Role
        });
        await newStudent.save();
        return res.status(201).json({ success: true,message:"Student User Created Successfully"});
    } 
    catch (error) {
        console.error('Error creating student:', error);
        return res.status(500).json({ success: false, message: "Error creating student" });
    }
}

exports.TeacherRegistration = async (req, res) => {
    const { FullName, Email, Password, ContactInformation, AcademicBackground, TeachingExperience, Availability, TechnicalSkills, CurriculumVitae, PersonalStatement, TeachingPhilosophy, CareerGoals, References, BackgroundCheckConsent, Role } = req.body;

    const existingTeacher = await Teacher.findOne({ Email });

    if (existingTeacher) {
        return res.status(400).json({ status: false, message: "Teacher data already exists in the database" });
    }

    try {
        // Encrypt the password
        const encryptedPassword = encryptor.encrypt(Password);

        // Save the new teacher to the database
        const newTeacher = new Teacher({
            FullName,
            Email,
            Password: encryptedPassword,
            ContactInformation,
            AcademicBackground,
            TeachingExperience,
            Availability,
            TechnicalSkills,
            CurriculumVitae,
            PersonalStatement,
            TeachingPhilosophy,
            CareerGoals,
            References,
            BackgroundCheckConsent,
            Role // Assign the role from the request body
        });
        await newTeacher.save();

        return res.status(201).json({ success: true, message: "Teacher user created successfully" });
    } catch (error) {
        console.error('Error creating teacher:', error);
        return res.status(500).json({ success: false, message: "Error creating teacher" });
    }
}
