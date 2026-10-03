//Packet structure: SOP|FLAGS|TID|SID|DID|CID|SEQ|ERR|DATA...|CHK|EOP
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


//Sphero command API
const RobotControlService = "22bb746f2ba075542d6f726568705327";
//Connection/control-management service
const BLEService = "22bb746f2bb075542d6f726568705327";

// CommandsCharacteristic = "22bb746f2ba175542d6f726568705327"
// ResponseCharacteristic = "22bb746f2ba675542d6f726568705327"

// AntiDosCharacteristic = "22bb746f2bbd75542d6f726568705327"
// TXPowerCharacteristic = "22bb746f2bb275542d6f726568705327"
// WakeCharacteristic = "22bb746f2bbf75542d6f726568705327"


/*
SOP	Start of Packet	Control byte identifying the start of the packet
FLAGS	Packet Flags	Bit-flags that modify the behavior of the packet
TID	Target ID	Address of the target, expressed as a port ID (upper nibble) and a node ID (lower nibble). (Optional)
SID	Source ID	Address of the source, expressed as a port ID (upper nibble) and a node ID (lower nibble). (Optional)
DID	Device ID	The command group ("virtual device") of the command being sent
CID	Command ID	The command to execute
SEQ	Sequence Number	The token used to link commands with responses
ERR	Error Code	Command error code of the response packet (optional)
DATA...	Message Data	Zero or more bytes of message data
CHK	Checksum	The sum of all bytes (excluding SOP & EOP) mod 256, bit-inverted
EOP	End of Packet	Control byte identifying the end of the packet
*/
export default function create_packet() {
const test_packet = `${SOP}${FLAGS}${TID}${SID}${DID}${CID}${SEQ}${ERR}${DATA}${CHK}${EOP}`;
}

function calculateChecksum() {
    //TODO
}