package crud.prac.domain.posts;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
public class Board {
    @Id
    @GeneratedValue
    @Column(name = "board_id")
    private Long id;

    private String category;

    @CreationTimestamp
    private LocalDateTime initDate;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Posts> postsList = new ArrayList<>(); // 게시글 모음
}
