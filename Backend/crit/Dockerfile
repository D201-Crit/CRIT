FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
RUN chmod +x /app.jar  # 이 부분을 추가하여 실행 권한을 부여합니다.
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /app.jar"]
