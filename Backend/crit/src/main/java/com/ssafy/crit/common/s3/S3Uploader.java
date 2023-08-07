package com.ssafy.crit.common.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jcodec.api.FrameGrab;
import org.jcodec.api.JCodecException;
import org.jcodec.common.io.FileChannelWrapper;
import org.jcodec.common.io.NIOUtils;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;
@Component
@Slf4j
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;
    private static final String EXTENSION = "png";
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFiles(MultipartFile multipartFile, String dirName) throws IOException {
        log.info("uploadFiles 진입");
        File uploadFile = convert(multipartFile) // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> { return new IllegalArgumentException("error: MultipartFile -> File convert fail");});
        return upload(uploadFile, dirName);
    }


    public String upload(File uploadFile, String filePath) {
        log.info("39");
        String fileName = filePath + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
        log.info("40");
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        log.info("41");
        removeNewFile(uploadFile);
        log.info("42");
        return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        log.info("37");
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        log.info("38");
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        log.info("33");
        if (targetFile.delete()) {
            log.info("34");
            System.out.println("File delete success");
            log.info("35");
            return;
        }
        log.info("36");
        System.out.println("File delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        log.info("convert 진입");
        File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
        log.info("file 생성");
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            log.info("1");
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                log.info("2");
                fos.write(file.getBytes());
                log.info("3");
            }
            log.info("4");
            return Optional.of(convertFile);
        }
        log.info("5");
        return Optional.empty();
    }

    public String uploadThumbnail(MultipartFile videoFile, String dirName) throws IOException{
        log.info("6");
        File file = convertMultipartFileToFile(videoFile);
        log.info("7");
        String thumbnailURL = getThumbnailURL(dirName, file);
        log.info("8");
        try {
            log.info("9");
            Files.delete(Path.of(file.getPath()));
            log.info("10");
        } catch (IOException e) {
            log.info("11");
            throw new RuntimeException(e);
        }
        log.info("12");
        return thumbnailURL;
    }


    // S3에 썸네일 이미지를 추출 및 저장
    private String getThumbnailURL(String dirName, File file) {
        log.info("13");
        String thumbnailName = dirName + "/" + UUID.randomUUID() + "Thumbnail." + EXTENSION;
        log.info("14");
        try (FileChannelWrapper fileChannelWrapper = NIOUtils.readableChannel(file)) {
            log.info("15");
            FrameGrab grab = FrameGrab.createFrameGrab(fileChannelWrapper);
            log.info("16");
            Picture picture = grab.seekToSecondPrecise(1.0).getNativeFrame();
            log.info("17");
            BufferedImage bufferedImage = AWTUtil.toBufferedImage(picture);
            log.info("18");
            int width = bufferedImage.getWidth();
            log.info("19");
            int height = bufferedImage.getHeight();
            log.info("20");
            BufferedImage outputImage = new BufferedImage(height, width, bufferedImage.getType());

//           추후 썸네일 이미지 튜닝
//            Graphics2D g2d = outputImage.createGraphics();
//            AffineTransform at = new AffineTransform();
//            at.translate(height, 0);
//            at.rotate(Math.PI / 2);
//            g2d.setTransform(at);
//            g2d.drawImage(bufferedImage, 0, 0, null);
//            g2d.dispose();
            log.info("21");
            File thumbnailFile = new File("Thumbnail." + EXTENSION);
            log.info("22");
            ImageIO.write(bufferedImage, EXTENSION, thumbnailFile);
            log.info("23");
            amazonS3Client.putObject(new PutObjectRequest(bucket, thumbnailName, thumbnailFile).withCannedAcl(CannedAccessControlList.PublicRead));
            log.info("24");
            removeNewFile(thumbnailFile);
            log.info("25");
            return amazonS3Client.getUrl(bucket, thumbnailName).toString();
        } catch (JCodecException | IOException e) {
            log.info("26");
            throw new RuntimeException(e);
        }
    }

    // Convert MultipartFile to File
    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        log.info("27");
        File convFile = new File(file.getOriginalFilename());
        log.info("28");
        convFile.createNewFile();
        log.info("29");
        FileOutputStream fos = new FileOutputStream(convFile);
        log.info("30");
        fos.write(file.getBytes());
        log.info("31");
        fos.close();
        log.info("32");
        return convFile;
    }

}