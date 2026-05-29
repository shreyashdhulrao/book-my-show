import { storage, databases, ID } from "../appwriteConfig";

const DATABASE_ID = "YOUR_DB_ID";
const COLLECTION_ID = "YOUR_COLLECTION_ID";
const BUCKET_ID = "YOUR_BUCKET_ID";


// ✅ STEP 5 - Upload Image
export const uploadImage = async (file) => {
  return await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    file
  );
};


// Create Event
export const createEvent = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    data
  );
};