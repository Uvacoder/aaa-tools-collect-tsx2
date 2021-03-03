import RssFeedEmitter from 'rss-feed-emitter';

const feeder = new RssFeedEmitter({
  userAgent:
    'Developer ToolBox (https://github.com/AndresMorelos/developer-toolbox)',
});

feeder.on('error-2', (err) => console.error('a', err));

export default feeder;
