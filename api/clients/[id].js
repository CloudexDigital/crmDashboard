import { dbConnect } from '../../lib/dbConnect';
import Client from '../../lib/models/clients';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Client ID' });
  }

  if (req.method === 'GET') {
    try {
      const client = await Client.findById(id);
      if (!client) return res.status(404).json({ error: 'Client not found' });
      res.status(200).json(client);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedClient) return res.status(404).json({ error: 'Client not found' });
      res.status(200).json(updatedClient);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update client' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedClient = await Client.findByIdAndDelete(id);
      if (!deletedClient) return res.status(404).json({ error: 'Client not found' });
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete client' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
