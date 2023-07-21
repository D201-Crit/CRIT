package crud.prac.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import crud.prac.domain.posts.Posts;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
public class LikeTable {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Posts posts;
}
