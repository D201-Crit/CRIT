package crud.prac.domain.shorts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import crud.prac.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter

public class ShortsLikeTable {

    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Shorts shorts;

    private LocalDateTime localDateTime;
}


