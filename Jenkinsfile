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
                sh """
                docker build \
                -t muthuayyanar21/weather-app:latest \
                -t muthuayyanar21/weather-app:${BUILD_NUMBER} .
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                docker push muthuayyanar21/weather-app:latest
                docker push muthuayyanar21/weather-app:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker pull muthuayyanar21/weather-app:latest

                docker stop weather-container || true
                docker rm weather-container || true

                docker run -d \
                  --name weather-container \
                  -p 8081:80 \
                  muthuayyanar21/weather-app:latest
                '''
            }
        }
    }
}