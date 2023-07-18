package crud.prac.web.dto;

import crud.prac.domain.post.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private String title;
    private String content;
    private String author;

    public PostSaveRequestDto(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Post toEntity() {

        Post posts = new Post(title, content, author, 0);
        return posts;
    }
}
