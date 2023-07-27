package crud.prac.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsListResponseDto {

    private Long id;
    private String title;
    private String author;

    public PostsListResponseDto(Long id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

}
