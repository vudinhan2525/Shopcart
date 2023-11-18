const {
    BlobServiceClient,
    StorageSharedKeyCredential,
} = require('@azure/storage-blob');

const accountName = process.env.AZURE_NAME;
const accountKey = process.env.AZURE_KEY;
const containerName = 'shopcartctn';

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey,
);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential,
);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Function to upload an image
async function uploadImageToAzure(imagePath: string, imageName: string) {
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);
    await blockBlobClient.uploadFile(imagePath);
    console.log(`Image uploaded: ${blockBlobClient.url}`);
    return blockBlobClient.url;
}

// Call the function with the image path and name
export default uploadImageToAzure;
