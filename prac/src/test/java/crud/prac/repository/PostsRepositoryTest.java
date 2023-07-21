package crud.prac.repository;

import crud.prac.domain.posts.Posts;
import crud.prac.domain.repository.PostsRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class PostsRepositoryTest
{

    @Autowired
    private PostsRepository postsRepository;


    @AfterEach
    public void cleanUp() {
        postsRepository.deleteAll();
    }

    @Test
    public void savePosts() {


        // Posts 인스턴스 생성 및 저장
        String title = "title";
        String content = "content";

        postsRepository.save(new Posts(title, content, "zz",0));

        List<Posts> postsList = postsRepository.findAll();

        Posts posts = postsList.get(0);
        assertThat(posts.getTitle()).isEqualTo(title);
        assertThat(posts.getContent()).isEqualTo(content);
        // 게시글의 작성자가 우리가 생성한 Member 인스턴스와 같은지 확인
        assertThat(posts.getAuthor()).isEqualTo("zz");
    }
}
