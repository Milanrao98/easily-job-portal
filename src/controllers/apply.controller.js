import JobsModel from "../models/jobs.model.js";
import EmailService from "../services/emailService.js";

class Applycontroller {
    async apply(req, res) {

        const jobId = req.params.jobId;
        const { name, email, contact } = req.body;
        const resume = req.file.filename;

        const applicants = { name, email, contact, resume };

        const job = JobsModel.addApplicant(jobId, applicants);

        // ---- SEND EMAIL ----
        try {
            await EmailService.sendApplicationEmail(email, job.job_designation);
            console.log("Mail sent successfully");
        } catch (err) {
            console.log("Error sending mail:", err);
        }

        return res.redirect("/jobs");
    }
}

export default new Applycontroller();
