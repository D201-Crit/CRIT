package crud.prac.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Table(name = "file")
@Builder
@Getter
@AllArgsConstructor
public class FileUpload {

    @Id
    @GeneratedValue
    private Long id;

    @Comment("Original Name")
    private String orgNm;

    private String savedNm;

    private String savedPath;
}
