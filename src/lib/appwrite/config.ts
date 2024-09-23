import { Client, Account, Databases, Storage, Avatars } from "appwrite";

//${import.meta.env.BASE_URL}

export const appwriteConfig = {
  projectId: '66dc9b3c003c275c9bda',
  url: 'https://cloud.appwrite.io/v1', 
  databaseId: '66ddc4d4003704d695dd',
  storageId: '66dcc4290013b1600f97',
  userCollectionId: '66ddd70f00040f4a0c2f',
  postCollectionId: '66ddd6ee001791c930e1',
  savesCollectionId: '66ddd6f9000c1c04dfab',
};


export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

