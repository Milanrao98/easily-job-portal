// src/controllers/applicant.controller.js

import jobsModel from "../models/jobs.model.js";

class ApplicantController {
    getApplicants(req, res) {
        const jobId = req.params.jobId;          // 🔹 match :jobId from route
        const job = jobsModel.getJobById(jobId);

        if (!job) {
            // If job not found, show 404
            return res.redirect("/404");
        }

        const allApplicants = job.applicants;
        return res.render("pages/all-applicants", { allApplicants });
    }
}

export default new ApplicantController();
