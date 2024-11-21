export const appwriteConfig = {
    endpointurl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE as string,
    filesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION as string,
    secretKey: process.env.NEXT_APPWRITE_KEY as string
}