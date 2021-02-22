import { clipboard } from 'electron';

function Copy(value: string | undefined): void {
  if (value) {
    clipboard.writeText(value);
  }
}

export default Copy;
