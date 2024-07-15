var key ='123456789112345dfg';
var encryptor = require('simple-encryptor')(key);
const {ROLES} = require('../constants/index')


const isValidEmail = (email) => {
    const allowedDomains = ['gmail.com', 'example.com']; // Add your allowed domains
    const domain = email.split('@')[1];
  
    const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return EmailRegex.test(email) && allowedDomains.includes(domain); //validate the email and check if the email conatin the allowed domains
};

const isValidPassword = (password)=>{
    var decrypted = encryptor.decrypt(password)
    const isvalid= decrypted.length>=6;
    return isvalid
}

const RoleCheck = () => {
    return (req, res, next) => {
        const { Role } = req.body;

        if (ROLES.includes(Role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Unauthorized role' });
        }
    };
};

module.exports={isValidEmail,isValidPassword,RoleCheck};