import { WebSocketServerConnector } from 'locksmith-connector-ws';
import { HostSynchronizer } from 'locksmith';
import jsonReplacer from 'kkiro3d/lib/util/jsonReplacer';
import createEngine from './engine';

// Serve dist/ folder on 23481 port
let app = require('express')();
app.use(require('serve-static')('./dist'));
app.listen(23481, function () {
  console.log('Started app server on port 23481');
});

// Starts up kkiro3d multiplayer server
const PORT = 23482;
const FPS = 60;

let engine = createEngine();

let connector = new WebSocketServerConnector({
  port: PORT
});
connector.replacer = jsonReplacer;

let synchronizer = new HostSynchronizer(engine.systems.network.machine,
connector, {
  dynamic: false,
  dynamicPushWait: 10,
  dynamicTickWait: 10,
  fixedTick: 1000/FPS,
  fixedBuffer: 0,
  disconnectWait: 10000,
  freezeWait: 1000
});
synchronizer.connectionHandler = (data, clientId) => ({
  id: clientId,
  type: (data || {}).type
});
synchronizer.on('connect', (clientId) => {
  let data = synchronizer.clients[clientId].meta;
  engine.actions.external.execute('network.connect', clientId, data);
  if (clientId === 0) engine.actions.network.connectSelf();
});
synchronizer.on('disconnect', (clientId) => {
  engine.actions.external.execute('network.disconnect', clientId);
  if (clientId === 0) engine.actions.network.disconnectSelf();
});
connector.synchronizer = synchronizer;

engine.systems.network.synchronizer = synchronizer;

engine.start();

connector.start();
synchronizer.start();
synchronizer.on('tick', () => {
  engine.update(1/FPS);
});

console.log('Listening on port ' + PORT);
