package crud.prac.domain.chatting;

import crud.prac.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Chatting {

    @Id
    @GeneratedValue
    private Long id;

    private String message;

    private LocalDateTime localDateTime;

    @OneToMany(mappedBy = "member_id")
    private List<Member> member;

    @OneToMany(mappedBy = "chattingroom_id")
    private List<ChattingRoom> chattingRooms;
}
