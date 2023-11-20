const { jobs, users, company } = require("../mongoConfig");
const mongoDb = require("mongodb");

const addJob = async (req) => {
  const addone = await jobs.insertOne(req.body);
  const jobId = addone.insertedId;
  const cid = new mongoDb.ObjectId(req.body.cid);

  const d = await company.updateOne(
    { _id:cid },
    {
      $push: {
        jobs: jobId,
      },
    },
    {
      new: true,
    }
  );
  console.log(d);
  return addone;
};

const saveJob = async (req) => {
  const jobId = (req.params.jobId);
  const userId = new mongoDb.ObjectId(req.userId);
  const userData = await users.findone({_id:userId});
  const jobsIdArr = userData.saveJob;
  const jobIds = jobsIdArr.filter((e)=>e==jobId);
  if(jobIds.length) throw new Error("jobalready saved") 
  return users.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        savedjobs: jobId,
      },
    },
    {
      new: true,
    }
  );
};

const getsaveJob = async(req)=>{
    const userId = new mongoDb.ObjectId(req.params.userId);
    const userData = await users.findOne({_id:userId});
    const jobIds = userData.savedjobs;
    const jobsPromise = jobIds.map((e) => jobs.findOne({_id : new mongoDb.ObjectId(e)}));
    const jobsResolve = await Promise.allSettled(jobsPromise);
    return jobsResolve;

}

const getAll = async (req) => {
  return jobs.find({}).toArray();
};
const getOne = async (req) => {
  const jobId = new mongoDb.ObjectId(req.params.jobId);
  return jobs.findOne({ _id: jobId });
};

const modify = async (req) => {
  const jobId = new mongoDb.ObjectId(req.params.jobId);
  return jobs.findOneAndUpdate(
    { _id: jobId },
    { $set: { ...req.body } },
    { new: true }
  );
};

const del = async (req) => {
  const jobId = new mongoDb.ObjectId(req.params.jobId);
  const cid = new mongoDb.ObjectId(req.params.cid);

  return {
    one: jobs.findOneAndDelete({ _id: jobId }),
    two: company.updateOne(
      {
        _id: cid,
      },
      {
        $pull: {
          jobs: jobId,
        },
      },
      {
        new: true,
      }
    ),
  };
};
module.exports = {
  addJob,
  modify,
  getAll,
  getOne,
  del,
  saveJob,
  getsaveJob
};
