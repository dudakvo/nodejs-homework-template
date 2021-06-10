const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const createFolderIsNotExist = require("../helpers/create-dir");

class Upload {
  constructor(AVATAR_OF_USERS) {
    this.AVATAR_OF_USERS = AVATAR_OF_USERS;
  }

  async trasformAvatar(pathFile) {
    const avatar = await Jimp.read(pathFile);
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }

  async saveToStatic({ idUser, pathFile, name, oldFile }) {
    await this.trasformAvatar(pathFile);
    const folderAvatar = path.join(this.AVATAR_OF_USERS, idUser);
    await createFolderIsNotExist(folderAvatar);
    fs.rename(pathFile, path.join(folderAvatar, name));

    if (oldFile) {
      await this.deleteOldAvatar(
        path.join(process.cwd(), this.AVATAR_OF_USERS, oldFile)
      );
    }

    return path.normalize(path.join(idUser, name));
  }

  async deleteOldAvatar(pathFile) {
    try {
      fs.unlink(pathFile);
    } catch (error) {
      console.error(error.massage);
    }
  }
}

module.exports = Upload;
