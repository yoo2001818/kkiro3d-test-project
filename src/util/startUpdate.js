import BatteryManager from 'kkiro3d/lib/util/batteryManager';

// Starts engine update.
export default function startUpdate(engine) {
  let domCounter = 0;
  let prevTime = -1;
  let stepCounter = 0;
  let battery = new BatteryManager();
  let cancelled = false;

  function update(time) {
    if (cancelled) return;
    window.requestAnimationFrame(update);
    if (battery.mode !== 0) {
      stepCounter = (stepCounter + 1) % battery.mode;
      if (stepCounter !== 0) return;
    }
    if (prevTime === -1) prevTime = time;
    let delta = (time - prevTime) / 1000;
    prevTime = time;
    // Run update if not connected
    if (engine.systems.network.synchronizer == null) {
      engine.update(delta);
    }

    engine.actions.external.render(delta);
    domCounter += 1;
    if (domCounter % 3 === 0) engine.actions.external.domRender(delta);
  }

  window.requestAnimationFrame(update);

  return () => cancelled = true;
}
