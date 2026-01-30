import { MongoClient } from 'mongodb';


const client = new MongoClient('mongodb://localhost:27017');
  export const db = client.db("bookApp");

export const testConnection = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to server');
  }
  catch (error) {
    console.log('Failed to connect', error)
  }

}
