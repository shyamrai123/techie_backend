const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb+srv://raishyamkumar21:${process.env.MONGO_PASS}@cluster0.2sjbkmy.mongodb.net/techie`,
 { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);

const db = client.db();

const users =  db.collection("users");
const jobs = db.collection("jobs");
const company = db.collection("company")

const search = db.collection("search");

// jobs.createIndex(
//   {
//     title:'text',
//     company_name:'text'
//   }, {
//     name:"searchIndexTitle"
//   }
// )

// company.createIndex(
//   {
//     company_name:'text',
//     location:'text'
//   },
//   {
//     name:"searchIndexCompany"
// }
// )


module.exports = {users, jobs,company,search}