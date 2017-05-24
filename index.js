const ActiveXObject = require('winax');

export default class OpenHardwareMonitor {
  constructor() {
    this.conn = new ActiveXObject('WbemScripting.SWbemLocator');
    this.svr = this.con.ConnectServer('.', 'root\\OpenHardwareMonitor');
  }

  getHardware() {
    const hardware = [];
    const hardwareResults = this.svr.ExecQuery('Select * from Hardware');
    for (let i = 0; i < hardwareResults.Count; i += 1) {
      const p = hardwareResults.ItemIndex(i).Properties_;
      hardware.push({
        HardwareType: p.Item('HardwareType').Value,
        Name: p.Item('Name').Value,
        Identifier: p.Item('Identifier').Value,
        InstanceId: p.Item('InstanceId').Value,
      });
    }

    return hardware;
  }

  getGPUTemps() {
    const temps = [];
    const sensorResults = this.svr.ExecQuery('Select * from Sensor Where (Parent LIKE "/nvidiagpu/[0-9]" OR Parent LIKE "/atigpu/[0-9]") AND SensorType = "Temperature"');
    for (let i = 0; i < sensorResults.Count; i += 1) {
      const p = sensorResults.ItemIndex(i).Properties_;
      temps.push({
        Name: p.Item('Name').Value,
        Identifier: p.Item('Identifier').Value,
        InstanceId: p.Item('InstanceId').Value,
        Min: p.Item('Min').Value,
        Max: p.Item('Max').Value,
      });
    }

    return temps;
  }
}

