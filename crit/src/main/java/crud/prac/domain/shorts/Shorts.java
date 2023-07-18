package crud.prac.domain.shorts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class Shorts {

    @Id
    @GeneratedValue
    @Column(name = "shorts_id")
    private Long id;

    private String title;

    @OneToMany(mappedBy = "member")
    private List<ShortsLikeTable> like;

    @OneToOne(mappedBy = "id")
    private HashTagList hashTagList;

    private int views;


}
