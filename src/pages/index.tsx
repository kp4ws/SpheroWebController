import { Button } from "@/components/ui/button";
import { useState } from "react";

import { connectToSphero, disconnectSphero } from "@/BLE-api/apiClient";

export default function Home() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [service, setService] = useState<BluetoothRemoteGATTService | null>(
    null,
  );
  const [characteristic, setCharacteristic] =
    useState<BluetoothRemoteGATTCharacteristic | null>(null);

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
