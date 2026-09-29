import { Button } from "@/components/ui/button";
import { useState } from "react";

//Start of Packet
const SOP = "0x8D";
//Packet Flags
const FLAGS = "";
//Target ID
const TID = "";
//Source ID
const SID = "";
//Device ID
const DID = "";
//Command ID
const CID = "";
//Sequence Number
const SEQ = "";
//Error Code
const ERR = "";
//Message Data
const DATA = "";
//Checksum
const CHK = "";
//End of Packet
const EOP = "";

const test_packet = `${SOP}${FLAGS}${TID}${SID}${DID}${CID}${SEQ}${ERR}${DATA}${CHK}${EOP}`;

const SPHERO_SERVICES = [
  "0000180a-0000-1000-8000-00805f9b34fb",
  "00001801-0000-1000-8000-00805f9b34fb",
  "00001016-d102-11e1-9b23-00025b00a5a5",
  "22bb746f-2bb0-7554-2d6f-726568705327",
  "22bb746f-2ba0-7554-2d6f-726568705327",
  "00001800-0000-1000-8000-00805f9b34fb",
];

//Sphero command API
const RobotControlService = "22bb746f2ba075542d6f726568705327";
//Connection/control-management service
const BLEService = "22bb746f2bb075542d6f726568705327";

// CommandsCharacteristic = "22bb746f2ba175542d6f726568705327"
// ResponseCharacteristic = "22bb746f2ba675542d6f726568705327"

// AntiDosCharacteristic = "22bb746f2bbd75542d6f726568705327"
// TXPowerCharacteristic = "22bb746f2bb275542d6f726568705327"
// WakeCharacteristic = "22bb746f2bbf75542d6f726568705327"

export default function Home() {
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
        filters: [{ namePrefix: "SK" }],
        optionalServices: SPHERO_SERVICES,
      });

      setDevice(selectedDevice);
      alert(`Connected to ${selectedDevice.name}`);

      const selectedServer = await selectedDevice.gatt?.connect();
      if (!selectedServer) {
        throw new Error("The device not support GATT");
      }

      setServer(selectedServer);

      // const selectedService =
      //   await selectedServer.getPrimaryService(SPHERO_SERVICE_UUID);
      // setService(selectedService);

      const services = await selectedServer.getPrimaryServices();

      console.log("===== SERVICES =====");

      for (const service of services) {
        console.log("Service:", service.uuid);

        const characteristics = await service?.getCharacteristics();

        for (const characteristic of characteristics) {
          console.log(
            "  Characteristic:",
            characteristic.uuid,
            characteristic.properties,
          );
        }
      }
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
