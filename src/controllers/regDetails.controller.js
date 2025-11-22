// src/controllers/regDetails.controller.js

import RegUserModel from "../models/reguser.model.js";

class RegisterDetailsController {
    postRegDetails(req, res) {
        const { name, email, password } = req.body;

        // If email already registered → go to login
        const exists = RegUserModel.findEmail(email);
        if (exists) {
            return res.redirect("/login");
        }

        const newUser = {
            id: RegUserModel.regUser.length + 1,
            name,
            email,
            password,
        };

        RegUserModel.addUser(newUser);

        // After successful registration → go to login
        return res.redirect("/login");
    }
}

export default new RegisterDetailsController();
