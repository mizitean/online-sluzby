import { MongoClient, ServerApiVersion } from "mongodb";
const mongoUri = process.env.MONGO_URI || ''
 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// async function runMongo() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// export default runMongo
// runMongo().catch(console.dir);

// const client = new MongoClient(mongoUri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to store the promise instance
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's safe to create a new connection for each request
  clientPromise = client.connect();
}

export default clientPromise;
