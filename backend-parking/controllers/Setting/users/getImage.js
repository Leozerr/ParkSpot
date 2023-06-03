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
  async getImage(req, res) {
    try {
      const containerName = "image"; // Specify the container where the images are stored
      const blobName = req.params.blobName; // Extract the blob name from the route parameter

      // Get a reference to the container
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      // Get a reference to the blob
      const blobClient = containerClient.getBlobClient(blobName);

      // Generate a shared access signature (SAS) URL with read permissions for the blob
      const sasUrl =
        blobClient.url +
        "?" +
        blobClient.generateSasUrl({
          permissions: {
            read: true,
          },
          startsOn: new Date(),
          expiresOn: new Date(new Date().valueOf() + 86400), // URL expiration time (1 day from now)
        });

      res.status(200).send(sasUrl);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred while retrieving the image URL.");
    }
  },
};
