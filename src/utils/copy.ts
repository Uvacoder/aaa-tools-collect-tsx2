import { clipboard } from 'electron';

function Copy(value: string) {
  if (value) {
    clipboard.writeText(value);
  }
  return null;
}

export default Copy;
