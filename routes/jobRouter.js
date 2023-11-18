const {Router}  = require("express");
const JobRouter = Router();
const { addJob, modify, getAll, getOne, del,saveJob,getsaveJob} = require("../controller/jobsController");

JobRouter.post("/add",async(req,res) => {
    try {
        console.log(req);
        if((!req.isAuth && req.access !== "admin") && req.access !== "recruitor") throw new Error("Unauthenticated");
        const data = await addJob(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
})

JobRouter.get("/getAll",async(req,res) => {
    try {
       
        const data = await getAll(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
})
JobRouter.get("/get/:jobId",async(req,res) => {

    try {
      
        const data = await getOne(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
})




JobRouter.patch("/modify/:userId/:jobId",async(req,res) => {
    try {
        if(!req.isAuth && req.access !== "admin") throw new Error("Unauthenticated");
        const data = await modify(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
})

JobRouter.delete("/delete/:jobId/:cid",async(req,res) => {
    try {
        if(!req.isAuth && req.access !== "admin") throw new Error("Unauthenticated");
        const data = await del(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
})



JobRouter.post("/saveJob/:jobId",async(req,res) => {
    try {
       
        const data = await saveJob(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
});


JobRouter.get("/savedJobs/All/:userId",async(req,res) => {
    try {
       
        const data = await getsaveJob(req);
        res.send(data);
    } catch (error) {
        res.send({Err : error.message})
    }
})
module.exports = JobRouter;