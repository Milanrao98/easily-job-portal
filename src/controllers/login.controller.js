import RegUserModel from "../models/reguser.model.js";

class LoginController {

    showLogin(req, res) {
        res.render("pages/user-login");
    }

    verifyLogin(req, res) {
        const { email, password } = req.body;

        const user = RegUserModel.findEmail(email);

        if (!user) {
            console.log("No user found with this email");
            return res.redirect("/login");
        }

        if (user.password !== password) {
            console.log("Wrong password");
            return res.redirect("/login");
        }

        // Save recruiter to session
        req.session.user = user;

        return res.redirect("/jobs");
    }
}

export default new LoginController();
