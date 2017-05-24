require('winax');
var con = new ActiveXObject('WbemScripting.SWbemLocator');
var svr = con.ConnectServer('.', 'root\\OpenHardwareMonitor');
var hardware = svr.ExecQuery("Select * from Hardware");
console.log(hardware.Count);

for(var i = 0; i<hardware.Count; i++) {
	var p = hardware.ItemIndex(i).Properties_;
	console.log(p.Item('HardwareType').Value);
	console.log(p.Item('Name').Value);
}
