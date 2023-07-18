package crud.prac.domain.shorts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import crud.prac.domain.Member;
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

    @JsonIgnore
    @OneToOne(mappedBy = "id")
    private HashTagList hashTagList;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int views;


}
