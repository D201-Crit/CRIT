package crud.prac.domain.challenge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String info;

    private LocalDateTime startDate;

    private int plusDate;

    private LocalDateTime startTime;

    private int challengeTime;

    @Enumerated(EnumType.STRING)
    private Certification certification;

    private Boolean offline;

    private LocalDateTime localDateTime;



}
