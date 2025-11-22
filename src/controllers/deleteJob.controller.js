import JobsModel from "../models/jobs.model.js";

class DeleteJobController {

    deleteJob(req, res) {
        const jobId = req.params.id;

        const job = JobsModel.getJobById(jobId);

        if (!job) {
            return res.render("pages/404");
        }

        // Authorization: only the owner can delete
        if (job.recruiterId !== req.session.user?.id) {
            return res.status(403).send("Unauthorized");
        }

        JobsModel.deleteJob(jobId);

        return res.redirect("/jobs");
    }
}

export default new DeleteJobController();
