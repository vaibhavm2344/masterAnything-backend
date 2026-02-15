pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout Code') {
            steps {
                    git branch: 'main',
                    url: 'https://github.com/vaibhavm2344/masterAnything-backend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t masteranything-backend:latest ./backend'
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker tag masteranything-backend:latest rushi1501/masteranything-backend:latest'
                sh 'docker push rushi1501/masteranything-backend:latest'
            }
        }
    }
}
post {
    always {
        sh 'docker logout'
    }
}