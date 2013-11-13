HostSpot 
========

#	The problem

Looking forward a proper wifi access to use the robot is always a pain in the ass. So, #elBraian would be its own hotspot, regarding have access to the web application and provide internet access if ethernet link is used for.

Mostly i followed this tutorial
http://elinux.org/RPI-Wireless-Hotspot

#	11/11/2013

I decided to move out to another dns application which allow me provide name server service locally for the hotspot clients: dnsmasq.

I followed this tutorial: https://wiki.debian.org/HowTo/dnsmasq#Basic_DNS_Setup
But need some modification:
* add "name server 127.0.0.1" on /etc/resolv.conf
* add elbraian.bot on /etc/hosts
* restart dnsmasq service

Note: Just be careful what name you are picking for: i.e i already have several issues trying to add this one: elbraian.pi, It's likely not a valid FQDN for the mainstream browsers, at least.


