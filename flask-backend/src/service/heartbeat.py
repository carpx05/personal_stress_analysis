import threading
import time
import logging
from logging.handlers import RotatingFileHandler

class HeartbeatService:
    def __init__(self, app, ping_interval=300):
        self.app = app
        self.ping_interval = ping_interval
        self.is_running = False
        self.setup_logging()
        
    def setup_logging(self):
        self.logger = logging.getLogger('HeartbeatService')
        self.logger.setLevel(logging.INFO)
        
        handler = RotatingFileHandler(
            'heartbeat.log',
            maxBytes=1024*1024,
            backupCount=5
        )
        formatter = logging.Formatter(
            '%(asctime)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

    def internal_ping(self):
        """Sends request to the Flask server to keep it active"""
        with self.app.test_client() as client:
            while self.is_running:
                try:
                    response = client.get('/heartbeat/ping')
                    if response.status_code == 200:
                        self.logger.info('Heartbeat ping successful')
                    else:
                        self.logger.warning(f'Unexpected status code: {response.status_code}')
                except Exception as e:
                    self.logger.error(f'Heartbeat ping failed: {str(e)}')
                
                time.sleep(self.ping_interval)

    def start(self):
        """Start the heartbeat service"""
        self.is_running = True
        self.logger.info('Starting heartbeat service')
        
        self.ping_thread = threading.Thread(target=self.internal_ping)
        self.ping_thread.daemon = True
        self.ping_thread.start()
        
        self.logger.info('Heartbeat service started')

    def stop(self):
        """Stop the heartbeat service"""
        self.is_running = False
        self.logger.info('Heartbeat service stopped')