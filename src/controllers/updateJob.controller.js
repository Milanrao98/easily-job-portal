import JobsModel from "../models/jobs.model.js";

class UpdateJobController {

    showUpdateForm(req, res) {
        const id = req.params.id;
        const job = JobsModel.getJobById(id);

        if (!job) {
            return res.render("pages/404");
        }

        // Authorization: only job owner can edit
        if (job.recruiterId !== req.session.user?.id) {
            return res.status(403).send("Unauthorized");
        }

        res.render("pages/update-job", { job });
    }

    updateJob(req, res) {
        const id = req.params.id;
        const job = JobsModel.getJobById(id);

        if (!job) {
            return res.render("pages/404");
        }

        // Authorization check BEFORE updating
        if (job.recruiterId !== req.session.user?.id) {
            return res.status(403).send("Unauthorized");
        }

        let {
            job_category,
            job_designation,
            job_location,
            company_name,
            company_founded,
            employees,
            salary,
            number_of_openings,
            experience,
            skills_required,
            apply_by
        } = req.body;

        if (!Array.isArray(skills_required)) {
            skills_required = [skills_required];
        }

        const updatedFields = {
            job_category,
            job_designation,
            job_location,
            company_name,
            company_founded,
            employees,
            salary,
            number_of_openings,
            experience,
            skills_required,
            apply_by
        };

        if (req.file) {
            updatedFields.logo = "/uploads/" + req.file.filename;
        }

        JobsModel.updateJob(id, updatedFields);

        return res.redirect("/jobs");
    }
}

export default new UpdateJobController();
