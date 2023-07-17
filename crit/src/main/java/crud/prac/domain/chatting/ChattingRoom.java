package crud.prac.domain.chatting;

import crud.prac.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ChattingRoom {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

}
