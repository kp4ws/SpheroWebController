/*
API interface that frontend uses
Calls the actual methods in cmds.ts (which have the actual implementation of the commands)
*/
export async function connectToSphero(): Promise<BluetoothDevice> {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "SK" }],
    // optionalServices: SPHERO_SERVICES, TODO
  });

  if (!device.gatt) {
    throw new Error("This device does not support GATT");
  }

  await device.gatt.connect();
  return device;
}

export function disconnectSphero(device: BluetoothDevice): void {
  device.gatt?.disconnect();
}