package crud.prac.web.dto;

import crud.prac.domain.Member;
import crud.prac.domain.post.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private String title;
    private String content;
    private Member author;


    public PostSaveRequestDto(String title, String content, Member author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Post toEntity() {

        return new Post(title, content, author, 0);
    }
}
