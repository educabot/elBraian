class PoolWebSocketHandler:
	clients = []
	def broadcast(self, message):
		for socketClient in self.clients:
			socketClient.write_message(message)
	def count(self):
		return len(self.clients)