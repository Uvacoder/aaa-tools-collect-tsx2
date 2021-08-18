/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-plusplus */
import { remote } from 'electron';
import { join } from 'path';
import { readdirSync, lstatSync } from 'fs-extra';
import { PluginManager } from 'live-plugin-manager';

export default class PluginRepository {
  path: string;

  pluginManager: PluginManager;

  private static instance: PluginRepository;

  constructor() {
    if (remote.app) {
      if (process.env.NODE_ENV === 'development') {
        this.path = join(remote.app.getAppPath(), '../', 'plugins');
      } else {
        this.path = join(
          remote.app.getPath('appData'),
          remote.app.getName(),
          'plugins'
        );
      }
      this.pluginManager = new PluginManager({ pluginsPath: this.path });
      this.installPlugins();
    }
  }

  public static getInstance(): PluginRepository {
    if (!PluginRepository.instance) {
      PluginRepository.instance = new PluginRepository();
    }

    return PluginRepository.instance;
  }

  installPlugins() {
    // eslint-disable-next-line no-restricted-syntax
    for (const path of readdirSync(this.path)) {
      const tempPath = join(this.path, path);
      if (lstatSync(tempPath).isDirectory()) {
        this.pluginManager.installFromPath(tempPath);
      }
    }
  }
}
