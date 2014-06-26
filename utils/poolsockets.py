class PoolWebSocketHandler:
	clients = []
	def broadcast(self, message):
		for socketClient in self.clients:
			socketClient.write_message(message)
	def broadcast_less(self, own_socket, message):
		for socketClient in self.clients:
			if socketClient != own_socket:
				socketClient.write_message(message)
	def count(self):
		return len(self.clients)