const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

// Retrieve the Azure Storage account name and account key from environment variables or other configuration
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

// Create a shared key credential using the account name and account key
const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

// Create a BlobServiceClient instance using the shared key credential
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

module.exports = {
  async profileImage(req, res) {
    try {
      const containerName = "profileimg"; // Specify the container where you want to store the image
      const blobName = req.headers["x-filename"]; // Extract the filename from request headers
      const data = req.body; // Assuming the image is sent in the request body as binary data

      // Get a reference to the container
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      // Create a block blob client with the desired blob name
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the image data to the blob
      const uploadResponse = await blockBlobClient.upload(data, data.length);

      res.status(200).send("Profile Image uploaded successfully.");
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred during image upload.");
    }
  },
};
