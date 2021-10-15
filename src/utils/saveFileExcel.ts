/* eslint-disable promise/always-return */
import { remote, shell } from 'electron';
import XLSx from 'xlsx';
import fs from 'fs-extra';
import path from 'path';

const SaveFileExcel = (workbook: any, name: string, props: any = {}) => {
  const pathDir = path.join(
    remote.app.getPath('documents'),
    'Developer ToolBox'
  );
  fs.ensureDir(pathDir)
    .then(() => {
      const reportPath = path.join(pathDir, name);
      XLSx.writeFile(workbook, reportPath, props);
      shell.openPath(reportPath);
    })
    .catch((err) => console.error(err));
};

export default SaveFileExcel;
