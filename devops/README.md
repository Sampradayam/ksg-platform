# DevOps Documentation

## Health Check Scripts

### health-check.sh

Automated health check script for CI/CD pipelines and monitoring.

**Usage:**

```bash
# Local environment
./devops/health-check.sh local

# Staging environment
./devops/health-check.sh staging

# Production environment
./devops/health-check.sh production
```

**Make executable:**

```bash
chmod +x devops/health-check.sh
```

**Integration with CI/CD:**

```yaml
# Example GitHub Actions
- name: Health Check
  run: ./devops/health-check.sh staging

# Example Jenkins
sh './devops/health-check.sh production'
```

## Health Endpoints

### Main Health Check
- **Endpoint:** `GET /api/v1/health`
- **Purpose:** Comprehensive health status
- **Returns:** Status, uptime, database connection, memory usage

### Readiness Probe
- **Endpoint:** `GET /api/v1/health/ready`
- **Purpose:** Check if app is ready to serve traffic
- **Use Case:** Kubernetes readiness probe, load balancer health checks

### Liveness Probe
- **Endpoint:** `GET /api/v1/health/live`
- **Purpose:** Check if app is alive
- **Use Case:** Kubernetes liveness probe, container orchestration

## Monitoring Integration

### Prometheus

```yaml
scrape_configs:
  - job_name: 'ksg-platform'
    metrics_path: '/api/v1/health'
    static_configs:
      - targets: ['api.ksg-platform.com:443']
```

### Uptime Monitoring

Configure your uptime monitoring service (Pingdom, UptimeRobot, etc.) to check:
- Primary: `https://api.ksg-platform.com/api/v1/health`
- Interval: 1-5 minutes
- Expected: HTTP 200, response contains `"status":"ok"`

### Load Balancer Health Checks

**AWS ALB/ELB:**
- Health check path: `/api/v1/health/ready`
- Healthy threshold: 2
- Unhealthy threshold: 3
- Timeout: 5 seconds
- Interval: 30 seconds

**Google Cloud Load Balancer:**
- Request path: `/api/v1/health/ready`
- Check interval: 10 seconds
- Timeout: 5 seconds

## Kubernetes Configuration

### Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /api/v1/health/live
    port: 5000
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

### Readiness Probe

```yaml
readinessProbe:
  httpGet:
    path: /api/v1/health/ready
    port: 5000
  initialDelaySeconds: 10
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

## Docker Health Check

Add to `Dockerfile`:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/api/v1/health || exit 1
```

## Troubleshooting

### Health Check Fails

1. **Check database connection:**
   ```bash
   curl http://localhost:5000/api/v1/health
   # Look at database.status field
   ```

2. **Check application logs:**
   ```bash
   docker logs ksg-backend
   # or
   tail -f backend/logs/app.log
   ```

3. **Verify environment variables:**
   ```bash
   # Check MONGO_URI is set correctly
   echo $MONGO_URI
   ```

### Readiness Probe Fails

- Database not connected
- Application still starting up
- Dependencies not available

### Liveness Probe Fails

- Application crashed
- Deadlock or infinite loop
- Out of memory

## CI/CD Integration Examples

### GitHub Actions

```yaml
name: Deploy and Health Check

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: |
          # Your deployment commands
          
      - name: Wait for deployment
        run: sleep 30
        
      - name: Health check
        run: |
          chmod +x devops/health-check.sh
          ./devops/health-check.sh staging
```

### Jenkins

```groovy
pipeline {
  stages {
    stage('Deploy') {
      steps {
        // Deployment steps
      }
    }
    stage('Health Check') {
      steps {
        sh 'chmod +x devops/health-check.sh'
        sh './devops/health-check.sh production'
      }
    }
  }
}
```

## Alerting

Set up alerts when health checks fail:

**Slack Webhook:**
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🚨 Health check failed on production!"}' \
  YOUR_SLACK_WEBHOOK_URL
```

**PagerDuty:**
- Integrate with monitoring service
- Trigger incident on health check failure
- Escalate if not resolved in 5 minutes
