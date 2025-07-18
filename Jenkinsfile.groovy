// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('572550')  // Jenkins me save kiya hua
//         DOCKERHUB_USER = '7828007626'
//     }

//     stages {
//         stage('Clone Repo') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/TechPavan-cmd/crm.git'
//             }
//         }

//         stage('Build Frontend Image') {
//             steps {
//                 dir('frontend') {
//                     sh "docker build -t ${7828007626}/frontend-app:latest ."
//                 }
//             }
//         }

//         stage('Build Backend Image') {
//             steps {
//                 dir('backend') {
//                     sh "docker build -t ${7828007626}/backend-app:latest ."
//                 }
//             }
//         }

//         stage('Push Docker Images') {
//             steps {
//                 sh "echo ${Indore2025} | docker login -u ${DOCK7828007626} --password-stdin"
//                 sh "docker push ${7828007626}/frontend-app:latest"
//                 sh "docker push ${7828007626}/backend-app:latest"
//             }
//         }

//         stage('Deploy to Kubernetes') {
//             steps {
//                 sh "kubectl apply -f k8s/frontend-deployment.yaml"
//                 sh "kubectl apply -f k8s/backend-deployment.yaml"
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = '7828007626'
        DOCKERHUB_PASSWORD = 'indore2025'
        IMAGE_NAME = 'my-crm-app'  // image ka naam jo aapko chahiye
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Logout DockerHub') {
            steps {
                sh 'docker logout'
            }
        }
    }
}
