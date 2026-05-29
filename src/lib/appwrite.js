import { Client, Databases, Storage, ID } from "appwrite";

// 1. CLIENT SETUP
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// 2. SERVICES
export const db = new Databases(client);
export const storage = new Storage(client);
export { ID };


// 3. IDS FROM .env
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = "events";
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;


// 4. CREATE EVENT
export const createEvent = async (data) => {
  return await db.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    data
  );
};


// 5. UPDATE EVENT (EDIT FORM)
export const updateEvent = async (id, data) => {
  return await db.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    id,
    data
  );
};


// 6. UPLOAD IMAGE
// export const uploadImage = async (file) => {
//   return await storage.createFile(
//     BUCKET_ID,
//     ID.unique(),
//     file
//   );
// };

const generateImageName = () => {
  const now = new Date();

  const timestamp = now.getTime(); // unique

  return `IMG${timestamp}`;
};

export const uploadImage = async (file) => {
  const imageName = generateImageName();

  // 🔥 create NEW file with custom name
  const renamedFile = new File([file], imageName + ".jpg", {
    type: file.type,
  });

  const uploadedFile = await storage.createFile(
    BUCKET_ID,
    imageName,
    renamedFile
  );

  return uploadedFile;
};

// 7. GET IMAGE URL
export const getImageUrl = (fileId) => {
  return storage.getFileView(BUCKET_ID, fileId);
};