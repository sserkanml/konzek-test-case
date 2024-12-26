# Talos Cluster Management and Configuration Guide

## Overview
This guide provides detailed information on managing and troubleshooting a Talos-based Kubernetes cluster, along with configuration examples for deploying workloads. Talos is a modern OS designed specifically for running Kubernetes, featuring immutability and minimal attack surface.

## Managing a Talos Cluster

### Basic Management Tasks

1. Cluster Health Checks
   ```bash
   talosctl health --nodes 10.0.0.2
   talosctl containers
   talosctl services
   ```

2. System Monitoring
   ```bash
   talosctl dmesg
   talosctl logs
   talosctl memory
   ```

3. Configuration Management
   ```bash
   talosctl gen config cluster-name https://cluster-endpoint:6443
   talosctl apply-config --insecure --nodes 10.0.0.2 --file worker.yaml
   ```

### Troubleshooting Procedures

1. Network Connectivity Issues
   - Verify node connectivity: `talosctl ping <node-ip>`
   - Check network configuration: `talosctl get addresses -n <node-ip>`
   - Inspect network interfaces: `talosctl interfaces list`

2. Service Issues
   - Check service status: `talosctl service status kubelet`
   - View service logs: `talosctl logs controller-runtime`
   - Restart services: `talosctl service restart kubelet`

3. Resource Problems
   - Monitor resources: `talosctl dashboard`
   - Check disk usage: `talosctl disks -n <node-ip>`
   - View process list: `talosctl processes`

## Sample Workload Configuration

### Basic Application Deployment

```yaml
# workload.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nodejs-app
  template:
    metadata:
      labels:
        app: nodejs-app
    spec:
      containers:
      - name: nodejs-app
        image: serkannnaml/konzek-server:latest   
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: nodejs-app-service
  namespace: default
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"  
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  selector:
    app: nodejs-app
```

### Deployment Instructions

1. Deploy the application:
   ```bash
   kubectl create -f workload.yaml
   ```

2. Verify deployment status:
   ```bash
   kubectl get deployments
   kubectl get pods
   ```

3. Check service creation:
   ```bash
   kubectl get services
   ```

4. View detailed deployment information:
   ```bash
   kubectl describe deployment sample-app
   ```

5. Check application logs:
   ```bash
   kubectl logs deployment/sample-app
   ```

### Testing the Deployment

1. For ClusterIP service (internal access):
   ```bash
   # Get the ClusterIP
   kubectl get service sample-app-service
   # Test using curl from within the cluster
   kubectl run -i --tty --rm debug --image=curlimages/curl -- curl http://sample-app-service
   ```

2. Expose application externally:
   ```bash
   kubectl patch svc sample-app-service -p '{"spec": {"type": "LoadBalancer"}}'
   ```

### Deployment Troubleshooting

- Pod issues: `kubectl describe pod <pod-name>`
- Service problems: `kubectl describe service sample-app-service`
- Node status: `kubectl get nodes`

### Talos Machine Configuration

```yaml
# machine-config.yaml
version: v1alpha1
machine:
  type: worker
  token: ${TALOS_TOKEN}
  ca:
    crt: ${TALOS_CA_CRT}
    key: ${TALOS_CA_KEY}
cluster:
  network:
    cni:
      name: flannel
  api:
    endpoint: https://cluster-endpoint:6443
```

## Best Practices

1. Security
   - Regularly update Talos version
   - Use encrypted network communications
   - Implement proper RBAC policies
   - Enable audit logging

2. Performance
   - Monitor resource utilization
   - Implement proper resource requests/limits
   - Use node affinity rules for workload distribution
   - Configure appropriate pod disruption budgets

3. Maintenance
   - Schedule regular backups
   - Plan for node upgrades
   - Document cluster configuration
   - Maintain configuration version control

## Common Issues and Solutions

1. Node Not Joining Cluster
   - Verify network connectivity
   - Check machine configuration
   - Ensure proper bootstrap token
   - Validate certificates

2. Pod Scheduling Issues
   - Check resource availability
   - Verify node taints and tolerations
   - Review pod affinity rules
   - Inspect scheduler logs

3. Network Problems
   - Verify CNI configuration
   - Check network policies
   - Ensure proper DNS setup
   - Validate service CIDR
