package crud.prac.service;

import crud.prac.domain.post.PostLikeTable;
import crud.prac.domain.post.Post;
import crud.prac.domain.post.PostComment;
import crud.prac.domain.Member;
import crud.prac.domain.repository.LikeTableRepository;
import crud.prac.domain.repository.PostRepository;
import crud.prac.domain.repository.PostCommentRepository;
import crud.prac.domain.repository.UserRepository;
import crud.prac.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postsRepository;
    private final PostCommentRepository reviewRepository;
    private final UserRepository userRepository;
    private final LikeTableRepository likeTableRepository;
    private final FileService fileService;


    @Transactional
    public Long save(PostSaveRequestDto requestDto){ // 게시물 저장
        return postsRepository.save(requestDto.toEntity())
                .getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto){
        Post posts = postsRepository.findById(id) .orElseThrow(() -> new IllegalArgumentException("해당 게시물 없음"));
        posts.update(requestDto.getTitle(), requestDto.getContent());
        return id;
    }

    @Transactional
    public PostsResponseDto findById(Long id){
        Post posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시물 없음"));
        posts.plusViews();
        return new PostsResponseDto(posts.getId(), posts.getTitle(), posts.getContent(), posts.getAuthor());
    }

    @Transactional(readOnly = true)
    public List<PostsListResponseDto> findAllDesc() {
        return postsRepository.findAllDesc().stream()
                .map(post -> new PostsListResponseDto(post.getId(), post.getTitle(), post.getAuthor()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Post> findbytitle(String title) {
        return postsRepository.findByTitleContaining(title);
    }

    @Transactional(readOnly = true)
    public List<Post> orderbyviews() {
        return postsRepository.orderbyviews();
    }

    @Transactional
    public void delete (Long id){
        Post posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시물 없음"));

        postsRepository.delete(posts);
    }

    @Transactional
    public PostComment createComment(ReviewRequestDto requestDto) {
        Post posts = postsRepository.findById(requestDto.getId()).get();
        PostComment savedComment = PostComment.builder()
                .posts(posts)
                .content(requestDto.getTalk()).build();
        reviewRepository.save(savedComment);
        return savedComment;
    }

    @Transactional
    public Post likePost(String title, String nickname) {
        // posts와 user가 존재하는지에 대한 검증은 구현하지 않음
        Post posts = postsRepository.findByTitle(title).get();
        Member member = userRepository.findByNickname(nickname).get();
        List<PostLikeTable> likeTables = likeTableRepository.findByUserAndPosts(member,posts);
        for (PostLikeTable table : likeTables) {
            if (table.getMember().getNickname().equals(nickname)) {
                posts.removeLikeTable(table);
                member.removeLikeTable(table);
                likeTableRepository.deleteByUserAndPosts(member,posts);
                return posts;
            }
        }

        PostLikeTable likeTable = new PostLikeTable();
        likeTable.setMember(member);
        likeTable.setPost(posts);
        likeTableRepository.save(likeTable);
        posts.addLikeTable(likeTable);
        member.addLikeTable(likeTable);
        return posts;
    }
}
