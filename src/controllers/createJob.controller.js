import JobsModel from "../models/jobs.model.js";

class CreateJobController {
    createJob(req, res) {
        const {
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

        // File upload
        const logo = req.file ? req.file.filename : "default-logo.png";

        // Convert skills to array
        const skillsArray = Array.isArray(skills_required)
            ? skills_required
            : [skills_required];

        // New job object
        const newJob = {
            id: JobsModel.getJobs().length + 1,
            featured: false,
            logo: "/uploads/" + logo,
            job_category,
            job_designation,
            job_location,
            company_name,
            company_founded,
            employees,
            salary,
            number_of_openings,
            experience,
            skills_required: skillsArray,
            job_posted: new Date().toLocaleDateString(),
            apply_by,
            applicants: [],
            recruiterId: req.session.user.id
        };

        // Add job using model function
        JobsModel.addJob(newJob);

        return res.redirect("/jobs");
    }
}

export default new CreateJobController();
