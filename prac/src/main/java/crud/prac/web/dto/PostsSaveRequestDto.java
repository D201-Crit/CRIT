package crud.prac.web.dto;

import crud.prac.domain.posts.Posts;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    private String title;
    private String content;
    private String author;

    public PostsSaveRequestDto(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

//    public Posts toEntity() {

//        Posts posts = new Posts(title, content, author, 0);
//        return posts;
//    }
}
