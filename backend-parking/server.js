const express = require("express");
var cors = require("cors");
const { DefaultAzureCredential } = require("@azure/identity");
// const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

// const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
// if (!accountName) throw Error("Azure Storage accountName not found");

// const blobServiceClient = new BlobServiceClient(
//   `https://${accountName}.blob.core.windows.net`,
//   new DefaultAzureCredential()
// );

// async function createContainer() {
//   // Create a unique name for the container
//   const containerName = "quickstart" + uuidv1();

//   console.log("\nCreating container...");
//   console.log("\t", containerName);

//   // Get a reference to a container
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   // Create the container
//   const createContainerResponse = await containerClient.create();
//   console.log(
//     `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
//   );
// }

// createContainer().catch((error) => {
//   console.error("An error occurred:", error);
// });

const app = express();
app.use(express.json());

app.use(cors());

const config = require("./config");

require("./routes")(app);

app.listen(config.PORT, () =>
  console.log("Server running on port", config.PORT)
);
