// src/models/reguser.model.js

class RegUserModel {
    constructor() {
        this.regUser = [
            {
                id: 1,
                name: "John",
                email: "johncena@gmail.com",
                password: "12345",
            },
        ];
    }

    // Check if email already exists
    findEmail(email) {
        return this.regUser.find((user) => user.email === email);
    }

    // Add new recruiter
    addUser(details) {
        this.regUser.push(details);
    }
}

export default new RegUserModel();
