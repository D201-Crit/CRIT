package crud.prac.domain.shorts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShortsCommnet {

    @Id
    @GeneratedValue
    @Column(name = "shorts_comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shorts_id")
    private Shorts shorts;


    // 이건 나중에 로그인 했을 때 로그읺 한 사람으로 자동으로 해줘야함.
    private String member;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    // parent 와 children 이랑 매핑해서
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    private ShortsCommnet parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<ShortsCommnet> children = new ArrayList<>();

    @ColumnDefault("FALSE")
    @Column(nullable = false)
    private Boolean isDeleted;

    public ShortsCommnet(String content){
        this.content = content;
    }

    public void update(String content){
        this.content = content;
    }
}
