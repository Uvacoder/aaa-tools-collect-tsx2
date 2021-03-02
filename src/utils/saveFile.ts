/* eslint-disable promise/always-return */
import { remote, shell } from 'electron';
import fs from 'fs-extra';
import path from 'path';

const SaveFile = (
  file: any,
  name: string,
  encoding:
    | 'ascii'
    | 'utf8'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | null
    | undefined
) => {
  const pathDir = path.join(
    remote.app.getPath('documents'),
    'Developer ToolBox'
  );
  fs.ensureDir(pathDir)
    .then(() => {
      const reportPath = path.join(pathDir, name);
      fs.writeFileSync(reportPath, file, { encoding });
      shell.openPath(reportPath);
    })
    .catch((err) => console.error(err));
};

export default SaveFile;
