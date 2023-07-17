package crud.prac.domain.shorts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class HashTag {

    @Id
    @GeneratedValue
    @Column(name = "hashtag_id")
    private Long id;

    private String hashTag;
}
