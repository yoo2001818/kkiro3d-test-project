import * as components from '../component';
import * as systems from '../system';

import createEngineLib from 'kkiro3d/lib/engine';

export default function createEngine() {
  return createEngineLib(components, systems);
}
