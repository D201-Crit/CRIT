package crud.prac.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "file")
@Builder
@Getter
@AllArgsConstructor
public class FileUpload {

    @Id
    @GeneratedValue
    @Column(name = "fileUpload_id")
    private Long id;

    @Comment("Original Name")
    private String orgNm;

    private String savedNm;

    private String savedPath;
}
