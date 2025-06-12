import { dbConnect } from '@/lib/dbConnect';
import Client from '@/lib/models/Client';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  } else if (req.method === 'POST') {
    try {
      const { fullName, email } = req.body;
      if (!fullName || !email) {
        return res.status(400).json({ error: 'Full name and email are required' });
      }
      const newClient = new Client(req.body);
      const savedClient = await newClient.save();
      res.status(201).json(savedClient);
    } catch (err) {
      res.status(500).json({ error: 'Failed to save client' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
