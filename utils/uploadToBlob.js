// Required modules and configurations
const appRoot = require('app-root-path');
const dotenv = require("dotenv");
const path = require('path');
dotenv.config({ path: "./config.env" });
const { BlobServiceClient } = require('@azure/storage-blob');

// Get the Azure Blob Storage connection string from the environment variables
const connectionString = process.env.AZURE_CONNECTION_STRING;

// Create a BlobServiceClient using the connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

/**
 * Function to upload files to an Azure Blob Storage container.
 * @param {string} containerName - The name of the Azure Blob Storage container.
 * @param {Object} fileArray - An object containing the files to be uploaded. Each property of the object should represent a file with 'name', 'data', and 'mimetype' fields.
 * @returns {Object} - An object containing the response for each uploaded file.
 */
const uploadToBlob = async (containerName, fileArray) => {
    try {
        // Get the container client for the specified container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        
        // Initialize an empty response object to store the upload responses for each file
        let response = {};
        
        // Loop through each file in the fileArray and upload it to the container
        for (let key in fileArray) {
            if (fileArray.hasOwnProperty(key)) {
                // Get the file details from the fileArray
                const file = fileArray[key];
                
                // Get the BlobClient for the file with its name
                const blobClient = containerClient.getBlockBlobClient(file.name);
                
                // Upload the file data to the Blob Storage with the specified mimetype
                response[key] = await blobClient.uploadData(file.data, {
                    blobHTTPHeaders: { blobContentType: file.mimetype },
                });
            }
        }
        
        // Return the response object containing the upload responses for each file
        return response;
    } catch (err) {
        // If there's an error during the upload process, return the error
        return err;
    }
}

module.exports = uploadToBlob;
