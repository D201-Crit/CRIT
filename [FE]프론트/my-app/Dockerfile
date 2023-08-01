# 단계 1: 리액트 애플리케이션 빌드
FROM node:lts-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# 앱 소스 코드 복사
COPY . .

# 필요한 빌드 작업 수행 (e.g., npm install, npm run build)
RUN npm install
RUN npm run build

# 단계 2: Nginx로 서빙할 정적 파일을 포함한 단계
FROM nginx:stable-alpine

# 기본 Nginx 설정 파일 삭제
RUN rm -rf /etc/nginx/conf.d/default.conf

# 호스트 시스템의 Nginx 설정 파일을 Docker 빌드 컨텍스트로 복사
COPY ./default.conf /etc/nginx/conf.d/default.conf

# 리액트 애플리케이션 빌드 결과물 복사
COPY --from=builder /app/build /usr/share/nginx/html

# 포트 지정 (선택사항)
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
