export default function lastVisit(req, res, next) {
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = req.cookies.lastVisit;
    }

    res.cookie("lastVisit", new Date().toLocaleString(), {
        maxAge: 24 * 60 * 60 * 1000,
    });

    next();
}
