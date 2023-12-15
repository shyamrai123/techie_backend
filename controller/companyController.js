
const {company,jobs, users} = require("../mongoConfig");
const mongodb = require("mongodb")

const addCompany = async(req) => {
    const addone =  await company.insertOne(req.body);
    return addone;
}

const getOneCompany = async(req) => {
    const cid = new mongodb.ObjectId(req.params.cid);
    return company.findOne({ _id : cid})
}
const getAllCompany = () => {
    return company.find({}).toArray();
}

const getCompanyJobs = async(req) => {
  const companyId = new mongodb.ObjectId(req.params.cid);
  const companyData = await company.findOne(companyId);
  const jobIds = companyData.jobs;
  const jobsPromise = jobIds.map((e) => jobs.findOne(e));
  return Promise.allSettled(jobsPromise);
}

const deleteCompany = async(req) => {
   const cid = new mongodb.ObjectId(req.params.cid);
   return company.findOneAndDelete({_id : cid}) 
}


const followcompany = async (req) => {
    const companyId =(req.params.companyId);
    const userId = new mongodb.ObjectId(req.userId);
    const userData = await users.findOne({_id:userId})
    const companyIdArr = userData.followCompany;
    const companyIds = companyIdArr.filter((e)=>e == (companyId));
    if(companyIds.length) throw new Error("company already following")
    return users.updateOne(
      { _id: userId },
      {
        $push: {
          followCompany: companyId,
        },
      },
      {
        new: true,
      }
    );
  };

  const getfollowcompany = async(req,res)=>{
    const userId = new mongodb.ObjectId(req.params.userId);
    const userData = await users.findOne({_id:userId});
    const companyIds = userData.followCompany;
    const compsPromise = companyIds.map((e) => company.findOne({_id:new mongodb.ObjectId(e)}));
    const compsResolve = await Promise.allSettled(compsPromise);
    return compsResolve;
   
  }


module.exports = {
    addCompany,
    getAllCompany,
    getCompanyJobs,
    deleteCompany,
    getOneCompany,
    followcompany,
   getfollowcompany
}