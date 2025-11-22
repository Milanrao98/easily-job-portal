// src/middleware/auth.js

function isLoggedIn(req, res, next) {
    // If no logged-in recruiter, show 404 page
    if (!req.session.user) {
        return res.redirect("/404");
    }
    next();
}

export default isLoggedIn;
