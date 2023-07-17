package crud.prac.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data

public class Follow {

    @Id
    @GeneratedValue
    private Long id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    private Member follower;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    private Member following;

    @Builder
    public Follow(Long id, Member follower, Member following) {
        this.id = id;
        this.follower = follower;
        this.following = following;
    }
}
