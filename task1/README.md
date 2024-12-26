# Node.js HTTP Server with systemd Service

This project is a simple Node.js HTTP server that runs as a `systemd` service. The server logs requests and errors to custom log files and restarts automatically in case of failure.

## Service Setup

1. Create a systemd service file:

```bash
sudo nano /etc/systemd/system/http-server.service
```

2. Add the following content to the file:

```bash
[Unit]
Description=Node.js HTTP Server
After=network.target

[Service]
ExecStart=/usr/bin/node /home/serkan/Projects/konzek/server/server.js
Restart=always
User=serkan
Group=serkan
Environment=NODE_ENV=production
WorkingDirectory=/home/serkan/Projects/konzek/server

# Redirect standard output and error to log files
StandardOutput=append:/var/log/http-server.log
StandardError=append:/var/log/http-server-error.log

[Install]
WantedBy=multi-user.target
```

3. Reload systemd to apply the new service:

```bash
sudo systemctl daemon-reload
```

4. Start the service:

```bash
sudo systemctl start http-server
```

5. Enable the service to start on boot:

```bash
sudo systemctl enable http-server
```


6. Check the status of the service:

```bash
sudo systemctl status http-server
```


7. Check the logs:

```bash
tail -f /var/log/http-server.log
# or
tail -f /var/log/http-server-error.log
```
