import JobsModel from "../models/jobs.model.js";

class JobDetailsController{
    getJobDetails(req,res){
        const id= req.params.id
        const job=JobsModel.getJobById(id)
        res.render("pages/job-details",{data:job})
    }
}

export default new JobDetailsController()