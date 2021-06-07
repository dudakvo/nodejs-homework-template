const fs = require("fs").promises;

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const createFolderIsNotExist = async (folder) => {
  try {
    if (!(await isAccessible(folder))) {
      await fs.mkdir(folder);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createFolderIsNotExist;
