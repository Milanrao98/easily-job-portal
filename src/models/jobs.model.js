class JobsModel {
    constructor() {
        this.jobs = [
            {
                id: 1,
                featured: true,
                logo: "images/google.png",
                job_designation: "Frontend Developer",
                company_name: "Google",
                job_location: "Bangalore",
                experience: "2-4 years",
                salary: "12 LPA",
                employees: "150k+ employees",
                skills_required: ["html", "css", "js"],
                job_posted: "19 Nov 2025",
                number_of_openings: 2,
                apply_by: "1 Dec 2026",
                applicants: []
            },
            {
                id: 2,
                featured: false,
                logo: "images/amz.png",
                job_designation: "Frontend Developer",
                company_name: "Amazon",
                job_location: "Hyderabad",
                experience: "3-5 years",
                salary: "15 LPA",
                employees: "90k+ employees",
                skills_required: ["react", "css", "typescript"],
                job_posted: "19 Nov 2025",
                number_of_openings: 3,
                apply_by: "10 Dec 2026",
                applicants: []
            }
        ];
    }

    getJobs() {
        return this.jobs;
    }

    getJobById(id){
        return this.jobs.find((job =>job.id==id))
    }

    addApplicant(jobId,applicantData){
        const job = this.jobs.find(job=>job.id==jobId)
        job.applicants.push(applicantData)
        return job
    }
    addJob(jobData) {
    this.jobs.push(jobData);
    }

  updateJob(id, updatedFields) {
    const index = this.jobs.findIndex(job => job.id == id);
    if (index === -1) return null;

    this.jobs[index] = {
        ...this.jobs[index],
        ...updatedFields
    };

    return this.jobs[index];
}

deleteJob(id) {
    const index = this.jobs.findIndex(job => job.id == id);
    if (index === -1) return false;

    this.jobs.splice(index, 1);
    return true;
}


}

export default new JobsModel();
