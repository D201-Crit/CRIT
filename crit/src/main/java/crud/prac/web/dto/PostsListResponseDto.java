package crud.prac.web.dto;

import crud.prac.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsListResponseDto {

    private Long id;
    private String title;
    private String author;

    public PostsListResponseDto(Long id, String title, Member author) {
        this.id = id;
        this.title = title;
        this.author = String.valueOf(author);
    }

}
