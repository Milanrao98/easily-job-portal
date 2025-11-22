class HomeController{
    landing(req,res){
        res.render("pages/landing-page")
    }
}

export default new HomeController()