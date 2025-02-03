# Test task

Інструкція для розгортання додатку на AWS Elastic Beanstalk:

Клонуйте репозиторій проекту на локальну машину за допомогою команди git clone <url_репозитория> і перейдіть в директорію проекту: cd <ім'я_проекту>.

1. Встановіть усі необхідні залежності для вашого проекту:
- npm install
- pip install awsebcli --upgrade --user

2. Ініціалізуйте додаток і середовище Elastic Beanstalk за допомогою EB CLI командою eb init. Під час ініціалізації виберіть регіон AWS, оберіть платформу Docker, а також виберіть або створіть SSH ключ для доступу до EC2.

3. Якщо середовище Elastic Beanstalk ще не створено, створіть його командою eb create <ім'я_середовища>.

4. Створіть репозиторій в ECR (якщо він ще не створений) за допомогою команди aws ecr create-repository --repository-name <ім'я_репозитория>.

5. Увійдіть в ECR за допомогою команди aws ecr get-login-password --region <регіон> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com

5. Побудуйте Docker-образ командою docker build -t <ім'я_образу> ..

6. Тегуйте образ для ECR командою docker tag <ім'я_образу>:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/<ім'я_репозитория>:latest

7. Запуште образ в ECR командою docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/<ім'я_репозитория>:latest

8. Створіть або відредагуйте файл Dockerrun.aws.json в корені проекту з наступним вмістом:

{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "<aws_account_id>.dkr.ecr.<region>.amazonaws.com/<ім'я_репозитория>:latest",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "8080"
    }
  ]
}

9. Розгорніть додаток на Elastic Beanstalk за допомогою команди eb deploy

10. Після завершення розгортання відкрийте додаток за допомогою команди eb open


# Screenshots:

<img width="1440" alt="Снимок экрана 2025-02-03 в 21 12 05" src="https://github.com/user-attachments/assets/fadaabef-1c6b-4558-b969-5d36b7308bd8" />


<img width="1440" alt="Снимок экрана 2025-02-03 в 21 12 11" src="https://github.com/user-attachments/assets/5824fd2d-1bd2-4caf-96f4-ef6c5b5b7ec4" />


