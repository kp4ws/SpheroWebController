import { Button } from "./components/ui/button";
import { useState } from "react";

const SPHERO_SERVICE_UUID = "00010001-574f-4f20-5370-6865726f2121";
//TODO: Figure out characteristic and other UUIDS

function App() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [service, setService] = useState<BluetoothRemoteGATTService | null>(
    null,
  );
  const [characteristic, setCharacteristic] =
    useState<BluetoothRemoteGATTCharacteristic | null>(null);

  const connectToSphero = async () => {
    console.log("Trying to connect");
    try {
      const selectedDevice = await navigator.bluetooth.requestDevice({
        filters: [{ name: "SK-F428" }, { namePrefix: "SK" }],
        optionalServices: [SPHERO_SERVICE_UUID],
      });

      setDevice(selectedDevice);
      alert(`Connected to ${selectedDevice.name}`);

      const selectedServer = await selectedDevice.gatt?.connect();
      if (!selectedServer) {
        throw new Error("The device not support GATT");
      }
      setServer(selectedServer);

      const selectedService =
        await selectedServer.getPrimaryService(SPHERO_SERVICE_UUID);
      setService(selectedService);

      // const characteristic = await service.getCharacteristic();
    } catch (error) {
      console.error(`Connection Failed: ${error}`);
    }
  };

  const disconnectSphero = () => {
    console.log("Disconnecting...", device);
    if (!device?.gatt) return;

    if (device.gatt.connected) {
      console.log("Disconnecting from Sphero SPRK+");
      device.gatt.disconnect();
    }
  
    setDevice(null);
    setServer(null);
    setService(null);
    setCharacteristic(null);
  };

  return (
    <>
      <section>
        <div className="hero"></div>
        <div>
          <h1>Sphero Controller</h1>
        </div>
        {!device ? (
          <Button onClick={connectToSphero}>Connect</Button>
        ) : (
          <Button onClick={disconnectSphero}>Disconnect</Button>
        )}
      </section>

      <section>
        {device ? (
          <div>Device connected: {device.name}</div>
        ) : (
          <div>Device not connected ...</div>
        )}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
