const { BlobServiceClient } = require('@azure/storage-blob');

// Function to upload an image to Azure Blob Storage
async function uploadToAzureBlobStorage(
    imageBuffer: any,
    containerName: string,
    blobName: string,
    connectionString: string,
) {
    const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blobClient.upload(
        imageBuffer,
        imageBuffer.length,
    );

    return blobClient.url;
}

export default uploadToAzureBlobStorage;
