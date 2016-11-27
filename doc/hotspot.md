HostSpot
========

#	The problem

Looking forward a proper wifi access to use the robot is always a pain in the ass. So, #elBraian would be its own hotspot, regarding have access to the web application and provide internet access if ethernet link is used for.

Mostly i followed this tutorial
http://elinux.org/RPI-Wireless-Hotspot

#	11/11/2013

I decided to move out to another dns application which allow me provide name server service locally for the hotspot clients: dnsmasq.

I followed this tutorial
But need some modification:
* add "name server 127.0.0.1" on /etc/resolv.conf
* add elbraian.bot on /etc/hosts
* restart dnsmasq service

Note: Just be careful what name you are picking for: i.e i already have several issues trying to add this one: elbraian.pi, It's likely not a valid FQDN for the mainstream browsers, at least.


11/24/2016
dnsmasq.conf

interface=wlan0      # Use interface wlan0
listen-address=10.5.5.1 # Explicitly specify the address to listen on
#bind-interfaces      # Bind to the interface to make sure we aren't sending things elsewhere
#server=8.8.8.8       # Forward DNS requests to Google DNS
#domain-needed        # Don't forward short names
#bogus-priv           # Never forward addresses in the non-routed address spaces.
dhcp-range=10.5.5.2,10.5.5.10,255.255.255.0,1h


hostapd.conf

interface=wlan0
ssid=tornilloTitan
hw_mode=g
channel=8
auth_algs=1
wmm_enabled=0
ieee80211n=1          # 802.11n support
wmm_enabled=1         # QoS support
ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]


/etc/default/hostapd

DAEMON_CONF="/etc/hostapd/hostapd.conf"

/etc/network/interfaces

iface wlan0 inet static
   address 10.5.5.1
   netmask 255.255.255.0
#    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
