# Generated by binpac_quickstart

# Analyzer for MQTT Protocol
#  - mqtt-protocol.pac: describes the MQTT protocol messages
#  - mqtt-analyzer.pac: describes the MQTT analyzer code

%include binpac.pac
%include bro.pac

%extern{
	#include "events.bif.h"
	#include "types.bif.h"
%}

analyzer MQTT withcontext {
	connection: MQTT_Conn;
	flow:       MQTT_Flow;
};

# Our connection consists of two flows, one in each direction.
connection MQTT_Conn(bro_analyzer: BroAnalyzer) {
	upflow   = MQTT_Flow(true);
	downflow = MQTT_Flow(false);
};

%include mqtt-protocol.pac

# Now we define the flow:
flow MQTT_Flow(is_orig: bool) {

	# ## TODO: Determine if you want flowunit or datagram parsing:

	# Using flowunit will cause the anlayzer to buffer incremental input.
	# This is needed for &oneline and &length. If you don't need this, you'll
	# get better performance with datagram.

	#flowunit = MQTT_PDU(is_orig) withcontext(connection, this);
	datagram = MQTT_PDU(is_orig) withcontext(connection, this);
};

%include mqtt-analyzer.pac
