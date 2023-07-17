package crud.prac.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "posts_id")
    private Posts posts;

    private String talk;

    @Builder
    public Review(Long id, Posts posts, String talk) {
        this.id = id;
        this.posts = posts;
        this.talk = talk;
    }
}
