package crud.prac.domain.Challenge;

import crud.prac.domain.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ChallengeRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "challenge_room_id")
    private Long id;

    private String roomName;

    private String info;

    private int usingTime;

    @Enumerated(EnumType.STRING)
    private Cert cert;

    @ColumnDefault("FALSE")
    private Boolean isOffline;

    private int people;

    private int money;

    @OneToMany(mappedBy = "challengeRoom")
    private List<IsCert> isCerts = new ArrayList<>();

    @OneToMany(mappedBy = "challengeRoom")
    private List<ChallengeCategory> categoryInChallenge = new ArrayList<>();
}
