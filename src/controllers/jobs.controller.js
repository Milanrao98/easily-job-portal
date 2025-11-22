import Jobsmodel from "../models/jobs.model.js"

class JobsController{
    
    list(req,res){
        const jobs = Jobsmodel.getJobs()
        res.render("pages/list-all-jobs",{jobs})
    }

    list(req, res) {
    let jobs = Jobsmodel.getJobs();

    const search = req.query.search?.toLowerCase();
    const location = req.query.location?.toLowerCase();

    if (search) {
        jobs = jobs.filter(job =>
            job.job_designation.toLowerCase().includes(search) ||
            job.company_name.toLowerCase().includes(search)
        );
    }

    if (location) {
        jobs = jobs.filter(job =>
            job.job_location.toLowerCase().includes(location)
        );
    }

    res.render("pages/list-all-jobs", { jobs, search, location });
}

}

export default new JobsController()