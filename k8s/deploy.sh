#!/bin/bash

root_dir=$(dirname $(dirname $(readlink -f $0)))

# Start Minikube
# minikube start
# Change Docker context from local to k8s one
# eval $(minikube docker-env)

# 1. Postgres

# 1.1 Create secrets
kubectl create secret generic postgres-secret --from-env-file $root_dir/k8s/postgres/.env
# 1.2 Check secrets
# kubectl get secrets postgres-secret -o yaml
# 1.3 Create resources
kubectl apply -f $root_dir/k8s/postgres/
# 1.4 Investigate database layout and data
# kubectl exec --tty --stdin postgres-... -- /bin/bash
# psql -d database; \l; \d+ customers; \q; exit
# 1.5 Clear mounted data
kubectl patch deployment postgres --type json -p='[{"op": "remove", "path": "/spec/template/spec/containers/0/volumeMounts/0"}]'

# 2. Migrations

# 2.1 Build image
docker build -t migration:0.1 $root_dir/db/
# 2.2 Run job
kubectl apply -f $root_dir/k8s/migration/
# Execute 1.4 to verify updates

# 3. RabbitMQ 

# 3.1 Create secrets
kubectl create secret generic rabbitmq-secret --from-env-file $root_dir/k8s/rabbitmq/.env
# 3.3 Create cluster-operator
kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"
# 3.4 Check cluster-operator resources
# kubectl get all -n rabbitmq-system
# 3.5 Create RabbitMQ cluster
kubectl apply -f $root_dir/k8s/rabbitmq/
# 3.6 Check whether the cluster is running
# kubectl get rabbitmqclusters.rabbitmq.com
# 3.7 Port-forward service to access UI locally
# kubectl port-forward service/rabbitmq-cluster 15672

# 4. Server

# 4.1 Build image
docker build -t server:0.1 $root_dir/services/server/
# 4.2 Create resources
kubectl apply -f $root_dir/k8s/server/
# 4.3 Look at deployment configuration
# kubectl describe deployments server-deployment

# 5. Email sender

# 5.1 Build image
docker build -t email-sender:0.1 $root_dir/services/email-sender/
# 5.2 Create secret
kubectl create secret generic email-sender-secret --from-env-file $root_dir/k8s/email-sender/.env
# 5.3 Create resources
kubectl apply -f $root_dir/k8s/email-sender/

# 6. Logger

# 6.1 Build image
docker build -t logging:0.1 $root_dir/services/logging/
# 6.2 Create resources
kubectl apply -f $root_dir/k8s/logging/
# 6.3 Check logs
# kubectl logs logging-deployment-...

# 7. Prometheus

# 7.1 Enable minikube addon
# minikube addons enable metrics-server
# 7.2 Scrape node metrics
# kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes/minikube
# 7.3 Create operator bundle
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/master/bundle.yaml --server-side
# 7.4 Add community repo
# helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
# 7.5 Create kube-state-metrics resources
helm install kube-state-metrics prometheus-community/kube-state-metrics
# 7.6 Create secret for additional config
kubectl create secret generic prometheus-kube-metrics-config --from-file=$root_dir/k8s/prometheus/prometheus-kube-metrics.yml
# 7.7 Create resources
kubectl apply -f $root_dir/k8s/prometheus
# 7.8 Create service monitor for RabbitMQ cluster
kubectl apply --filename https://raw.githubusercontent.com/rabbitmq/cluster-operator/main/observability/prometheus/monitors/rabbitmq-servicemonitor.yml
# 7.9 Port-forward service to access UI locally
# kubectl port-forward service/prometheus-operated 9090

# 8. Ingress

# 8.1 Enable minikube addon
# minikube addons enable ingress
# 8.2 Create resources
kubectl apply -f $root_dir/k8s/ingress.yml
# 8.3 Add minikube host
# sudo echo "192.168.49.2 app.dreamteam.com" >> /etc/hosts 
