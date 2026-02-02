#!/bin/bash

# Health Check Script for CI/CD and Monitoring
# Usage: ./health-check.sh [environment]
# Example: ./health-check.sh production

ENVIRONMENT=${1:-local}

# Set API URL based on environment
case $ENVIRONMENT in
  local)
    API_URL="http://localhost:5000"
    ;;
  staging)
    API_URL="https://staging-api.ksg-platform.com"
    ;;
  production)
    API_URL="https://api.ksg-platform.com"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    echo "Usage: ./health-check.sh [local|staging|production]"
    exit 1
    ;;
esac

echo "=========================================="
echo "Health Check for: $ENVIRONMENT"
echo "API URL: $API_URL"
echo "=========================================="
echo ""

# Function to check endpoint
check_endpoint() {
  local endpoint=$1
  local name=$2
  
  echo "Checking $name..."
  response=$(curl -s -w "\n%{http_code}" "$API_URL$endpoint")
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$http_code" -eq 200 ]; then
    echo "✅ $name: OK (HTTP $http_code)"
    echo "   Response: $body"
  else
    echo "❌ $name: FAILED (HTTP $http_code)"
    echo "   Response: $body"
    return 1
  fi
  echo ""
}

# Run health checks
EXIT_CODE=0

check_endpoint "/api/v1/health" "Main Health Check" || EXIT_CODE=1
check_endpoint "/api/v1/health/ready" "Readiness Probe" || EXIT_CODE=1
check_endpoint "/api/v1/health/live" "Liveness Probe" || EXIT_CODE=1

echo "=========================================="
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All health checks passed!"
else
  echo "❌ Some health checks failed!"
fi
echo "=========================================="

exit $EXIT_CODE
