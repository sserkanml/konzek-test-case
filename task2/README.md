# Node.js HTTP Server with Docker Compose

This project is a simple Node.js HTTP server that runs as a `docker-compose` service. The server logs requests and errors to custom log files and restarts automatically in case of failure.

## Service Setup

1. Create a docker-compose file:

```bash
touch docker-compose.yml
```

2. Add the following content in task2/docker-compose.yml:

3. Run the service:

```bash
docker-compose up -d
```