import fs from 'fs';
import path from 'path';

export function* getFiles(dir) {
  const dirents = fs.readdirSync(dir, {withFileTypes: true});
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield dirent.name;
    }
  }
}
