//Packet structure: SOP|FLAGS|TID|SID|DID|CID|SEQ|ERR|DATA...|CHK|EOP

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

}