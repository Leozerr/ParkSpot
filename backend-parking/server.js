const express = require("express");
var cors = require("cors");
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();
const multer = require("multer");
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// ole.error("An error occurred:", error);
// });

const app = express();
app.use(express.json());

app.use(cors());

// app.use(upload);

const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=parkspotkmitl;AccountKey=exE5xokAluYvRqJdxPtyoqeqqzRNiLbu+Gf1y/4yslFFPaD5UmJGk2ZffJIiGD6aiH98PkMNgKar+AStsD7Fqg==;EndpointSuffix=core.windows.net";
const containerName = "profileimg";

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
app.post("/uploadimg", upload.single("image"), async (req, res) => {
  try {
    // Get the uploaded image file
    const imageFile = req.file;

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create a unique name for the blob
    const blobName = Date.now().toString() + "-" + imageFile.originalname;

    // Get a block blob client and upload the image file
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(imageFile.buffer, {
      blobHTTPHeaders: {
        blobContentType: imageFile.mimetype,
      },
    });

    // Return the URL of the uploaded blob
    const imageUrl = blockBlobClient.url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

const config = require("./config");

require("./routes")(app);

app.listen(config.PORT, () =>
  console.log("Server running on port", config.PORT)
);
