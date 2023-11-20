const {Router} = require("express");
const { addCompany, getAllCompany, getCompanyJobs, deleteCompany, getOneCompany, followcompany } = require("../controller/companyController");
const companyRouter = Router();


companyRouter.post("/add",async(req,res) => {
    try {
        if((!req.isAuth && req.access !== "admin") && req.access !== "recruitor") throw new Error("Unauthenticated");
        const data = await addCompany(req);
        res.send(data)
    } catch (error) {
        res.send({error : error.message})
    }
})
companyRouter.get("/getall",async(req,res) => {
    try {
        const data = await getAllCompany(req);
        res.send(data)
    } catch (error) {
        res.send({Err : error.message})
    }
})

companyRouter.get("/getCompanyJobs/:cid", async(req,res) => {
    try {

        const data = await getCompanyJobs(req);
        res.send(data)
    } catch (error) {
        res.send({Err : error.message})
    }
})

companyRouter.delete("/delete/:cid", async(req,res) => {
    try {
        if((!req.isAuth && req.access !== "admin") && req.access !== "recruitor") throw new Error("Unauthenticated");
        const data = await deleteCompany(req);
        res.send(data);
    } catch (error) {
        res.send({Error : error.message})
        
    }
})
companyRouter.get("/getCompany/:cid", async(req,res) => {
    try {
        const data = await getOneCompany(req);
        res.send(data)
    } catch (error) {
        res.send({Error : error.message})
    }
})

companyRouter.post("/followcompany/:companyId",async(req,res) => {
  
    try {
         if((!req.isAuth && req.access !== "admin") && req.access !== "recruitor") throw new Error("Unauthenticated");
        const data = await followcompany(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
});


module.exports = companyRouter;