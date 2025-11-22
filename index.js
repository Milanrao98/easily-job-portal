import express from "express";
import path from "path";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import HomeController from "./src/controllers/home.controller.js";
import JobsController from "./src/controllers/jobs.controller.js";
import JobDetailsController from "./src/controllers/jobDetails.controller.js";
import Applycontroller from "./src/controllers/apply.controller.js";
import multer from "multer";
import ErrorPagecontroller from "./src/controllers/errorPage.controller.js";
import LoginController from "./src/controllers/login.controller.js";
import ApplicantController from "./src/controllers/applicant.controller.js";
import isLoggedIn from "./src/middleware/auth.js";
import RegisterDetailsController from "./src/controllers/regDetails.controller.js";
import CreateJobController from "./src/controllers/createJob.controller.js";
import UpdateJobController from "./src/controllers/updateJob.controller.js";
import DeleteJobController from "./src/controllers/deleteJob.controller.js";
import cookieParser from "cookie-parser";
import lastVisit from "./src/middleware/lastvisit.js";


const app = express();
app.set("trust proxy", 1);
// ---------- Multer setup ----------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// ---------- Middleware ----------
app.use(session({
    secret: "milanrao",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set true only when using HTTPS
}));

app.use(expressLayouts);
app.set("layout", "layouts/layout");

app.use(express.static(path.join(path.resolve(), "src", "public")));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Make logged-in user available to all EJS views as `user`
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
app.use(cookieParser());
app.use(lastVisit);

// ---------- Routes ----------

// Landing page
app.get("/", HomeController.landing);

// Jobs list + job details
app.get("/jobs", JobsController.list);
app.get("/job/:id", JobDetailsController.getJobDetails);

// Apply for job (job seeker)
app.post("/apply/:jobId", upload.single("resume"), Applycontroller.apply);

// Auth pages
app.get("/login", LoginController.showLogin);
app.post("/login", LoginController.verifyLogin);

// Recruiter registration
app.post("/register", RegisterDetailsController.postRegDetails);

// Applicants (RECRUITER ONLY)
app.get("/job/applicants/:jobId", isLoggedIn, ApplicantController.getApplicants);

// 404 route (used by isLoggedIn for blocked access)
app.get("/404", ErrorPagecontroller.error);

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");   // After logout, go to login page
    });
});

app.get("/postjob", isLoggedIn, (req, res) => {
    res.render("pages/new-job");
});

app.post("/postjob", upload.single("logo"), isLoggedIn, CreateJobController.createJob);
app.get("/job/update/:id", isLoggedIn, UpdateJobController.showUpdateForm);
app.post("/job/update/:id", isLoggedIn, upload.single("logo"), UpdateJobController.updateJob);
app.get("/job/delete/:id", isLoggedIn, DeleteJobController.deleteJob);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

