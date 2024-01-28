import { promises } from 'fs';
import { diskStorage } from 'multer';
import path from 'path';
import {
  alphabetLetters,
  alphabetNumber,
  nanoid,
} from 'src/shared/utils/nanoid.util';

export function Filestorage() {
  return diskStorage({
    destination: async function (req, file, cb) {
      const path = `./file-upload/uploads`;
      try {
        const state = await promises.stat(path);
        if (!state.isDirectory()) {
          await promises.mkdir(path);
        }
      } catch (error) {
        await promises.mkdir(path);
      } finally {
        cb(null, path);
      }
    },
    filename: function (req, file, cb) {
      const filename = nanoid(alphabetNumber + alphabetLetters, 16);
      const exname = path.extname(file.originalname);
      cb(null, filename + exname);
    },
  });
}
