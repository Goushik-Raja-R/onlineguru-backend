const express = require('express');
const jwt = require('jsonwebtoken');
const key = '123456789112345dfg';
const encryptor = require('simple-encryptor')(key);
const {GenerateToken} = require('../../middlewares/jwt')
const Student = require('../../models/Student'); // Assuming you have a Student model
const Teacher = require('../../models/Teacher')


exports.StudentLogin = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const student = await Student.findOne({ Email });

        if (!student) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        var decryptor = encryptor.decrypt(student.Password)

        if (decryptor !== Password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = GenerateToken(Email);
        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.TeacherLogin = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const teacher = await Teacher.findOne({ Email });

        if (!teacher) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const decryptedPassword = encryptor.decrypt(teacher.Password);

        if (decryptedPassword !== Password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = GenerateToken(Email);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
