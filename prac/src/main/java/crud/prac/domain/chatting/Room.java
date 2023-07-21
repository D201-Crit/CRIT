package crud.prac.domain.chatting;

import crud.prac.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private Long id;

    private String roomName;

//    @OneToMany(mappedBy = "user_id")
//    @JoinColumn(name = "nickname")
//    private List<User> userName;

    private String name;

    @OneToMany(mappedBy = "room")
    private List<Chatting> chattings = new ArrayList<>();
}
