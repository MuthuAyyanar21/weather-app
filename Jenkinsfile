pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t weather-app:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop weather-container || true
                docker rm weather-container || true
                docker run -d --name weather-container -p 8081:80 weather-app:latest
                '''
            }
        }
    }
}