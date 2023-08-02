# open jdk java11 버전 환경
FROM openjdk:11-jdk

VOLUME /tmp

# 생성된 이미지에서 열어줄
EXPOSE 8080

# JAR_FILE 변수 정의
ARG JAR_FILE=./build/libs/crit-0.0.1-SNAPSHOT.jar

# JAR 파일 메인 디렉터리에 복사
COPY ${JAR_FILE} app.jar

# 호스트 서버에 있는 application.yml과 application.properties 파일 복사
ADD /home/ubuntu/config/application.yml /app/application.yml
ADD /home/ubuntu/config/application.properties /app/application.properties

# 시스템 진입점 정의
ENTRYPOINT ["java", "-jar", "/app.jar"]
