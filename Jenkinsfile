pipeline {
  agent any
  stages {
    stage('Deploy') {
      steps {
        sh '''
          cd /home/kuchipudi/ksg-platform/ksg-platform
          git pull origin main
          docker compose down
          docker compose up -d --build
        '''
      }
    }
  }
}

