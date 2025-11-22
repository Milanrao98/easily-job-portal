class ErrorPagecontroller{
    error(req,res){
        res.render("pages/404")
    }
}

export default new ErrorPagecontroller()