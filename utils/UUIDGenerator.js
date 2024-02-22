const { v4: uuidv4 } = require('uuid');

const generateUuid = async () => {
  const fullUuid = uuidv4().replace(/-/g, ''); // Generate a full UUID and remove dashes
  return fullUuid.substring(0, 6); // Extract the first 5 characters
}

module.exports = generateUuid;
