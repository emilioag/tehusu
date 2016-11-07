

class DHT11:
    def __init__(self, redis):
        self.redis = redis
        self.Temperature = 0
        self.Humidity = 0

    def get(self):
        self.Temperature = round(float(self.redis.get("temperature")), 2)
        self.Humidity = round(float(self.redis.get("humidity")), 2)
