// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../src/config/database";

type Data = {
  success: boolean;
  data?: any;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Get a connection to the database
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    // Example: Fetch data from a collection
    const collection = db.collection("movies");
    const data = await collection.find({genres : ["Drama", "Fantasy"]}).toArray();

    // Send data back as a response
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}