package crud.prac.domain.shorts;

import crud.prac.domain.FileUpload;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class Shorts {

    @Id
    @GeneratedValue
    @Column(name = "shorts_id")
    private Long id;

    private String title;

    @OneToMany(mappedBy = "fileUpload_id")
    private List<FileUpload> fileUploads = new ArrayList<>();

    @OneToMany(mappedBy = "shortscomments_id")
    private List<ShortsComments> comments = new ArrayList<>();;

    @OneToMany(mappedBy = "member")
    private List<ShortsLikeTable> like = new ArrayList<>();;

    @OneToOne(mappedBy = "id")
    private HashTagList hashTagList;

    private int views;


}
