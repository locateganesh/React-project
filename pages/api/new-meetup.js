import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_USER_PASS;
// api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    // const {title, image, address, description} = data;
    const client = await MongoClient.connect(
      `mongodb+srv://${uri}/meetups?retryWrites=true&w=majority&appName=Cluster0`
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({message: 'Meetup inserted!'});
  }
}
export default handler;