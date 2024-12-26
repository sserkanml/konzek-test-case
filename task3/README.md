# Nodejs App Deployment with Terraform and Kubernetes

1. Create a terraform project and create a VPC, EKS Cluster, and Node Group.

```bash
terraform init
terraform plan
terraform apply
```

2. Create a Kubernetes deployment and service for the Nodejs app.

```bash
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
```

3. Deploy the Nodejs app to the EKS cluster.

```bash
kubectl get pods
```

4. Create a LoadBalancer service to access the Nodejs app from outside the cluster.

```bash
kubectl get services
```

5. Access the Nodejs app from outside the cluster.

```bash
curl http://<service-ip>
```
