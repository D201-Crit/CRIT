package crud.prac.domain.shorts;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class HashTagList {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "hashtag_id")
    private List<HashTag> hashTag;

    @JsonIgnore
    @OneToOne(mappedBy = "id")
    private Shorts shorts;
}
