package crud.prac.service;

import crud.prac.domain.LikeTable;
import crud.prac.domain.posts.Posts;
import crud.prac.domain.posts.Review;
import crud.prac.domain.User;
import crud.prac.domain.repository.LikeTableRepository;
import crud.prac.domain.repository.PostsRepository;
import crud.prac.domain.repository.ReviewRepository;
import crud.prac.domain.repository.UserRepository;
import crud.prac.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final LikeTableRepository likeTableRepository;

//    @Transactional
//    public Long save(PostsSaveRequestDto requestDto){
//        return postsRepository.save(requestDto.toEntity())
//                .getId();
//    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto){
        Posts posts = postsRepository.findById(id) .orElseThrow(() -> new IllegalArgumentException("해당 게시물 없음"));
        posts.update(requestDto.getTitle(), requestDto.getContent());
        return id;
    }

//    @Transactional
//    public PostsResponseDto findById(Long id){
//        Posts posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시물 없음"));
//        posts.Plusviews();
//        return new PostsResponseDto(posts.getId(), posts.getTitle(), posts.getContent(), posts.getAuthor());
//    }
//
//    @Transactional(readOnly = true)
//    public List<PostsListResponseDto> findAllDesc() {
//        return postsRepository.findAllDesc().stream()
//                .map(post -> new PostsListResponseDto(post.getId(), post.getTitle(), post.getAuthor()))
//                .collect(Collectors.toList());
//    }

    @Transactional(readOnly = true)
    public List<Posts> findbytitle(String title) {
        return postsRepository.findByTitleContaining(title);
    }

    @Transactional(readOnly = true)
    public List<Posts> orderbyviews() {
        return postsRepository.orderbyviews();
    }

    @Transactional
    public void delete (Long id){
        Posts posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시물 없음"));

        postsRepository.delete(posts);
    }

    @Transactional
    public Review createreview(ReviewRequestDto requestDto) {
        Posts posts = postsRepository.findById(requestDto.getId()).get();
        Review savedreview = Review.builder()
                .posts(posts)
                .talk(requestDto.getTalk()).build();
        reviewRepository.save(savedreview);
        return savedreview;
    }

    @Transactional
    public Posts likePost(String title, String nickname) {
        // posts와 user가 존재하는지에 대한 검증은 구현하지 않음
        Posts posts = postsRepository.findByTitle(title).get();
        User user = userRepository.findByNickname(nickname).get();
        List<LikeTable> likeTables = likeTableRepository.findByUserAndPosts(user,posts);
        for (LikeTable table : likeTables) {
            if (table.getUser().getNickname().equals(nickname)) {
                posts.removeLiketable(table);
                user.removeLiketable(table);
                likeTableRepository.deleteByUserAndPosts(user,posts);
                return posts;
            }
        }

        LikeTable likeTable = new LikeTable();
        likeTable.setUser(user);
        likeTable.setPosts(posts);
        likeTableRepository.save(likeTable);
        posts.addLiketable(likeTable);
        user.addLiketable(likeTable);
        return posts;
    }
}
