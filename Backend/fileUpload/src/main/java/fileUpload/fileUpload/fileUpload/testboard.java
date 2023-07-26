package fileUpload.fileUpload.fileUpload;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class testboard {
	@Id  //오라클 -mysql은 identity임
	@GeneratedValue
	private Long id;
	private String title;
	private String content;
	private String filename;//파일이름
	private String filepath;//파일경로

}
