echo '실행 시작'
 
echo 'git pull'
 
echo 'jar 파일 삭제'
rm build/libs/*.jar
 
echo '빌드 시작'
./gradlew build

echo '도커파일 이미지 빌드'
docker build -t crit_be .
 
echo '컨테이너 중지'
docker stop crit_be
 
echo '컨테이너 삭제'
docker rm crit_be
 
echo '컨테이너 실행'
docker run -p 8080:8080 --name crit_be --network ubuntu_default 
-d crit_be
