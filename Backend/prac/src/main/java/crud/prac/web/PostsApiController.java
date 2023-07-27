package crud.prac.web;

import crud.prac.domain.posts.Posts;
import crud.prac.domain.posts.Review;
import crud.prac.domain.User;
import crud.prac.service.PostsService;
import crud.prac.service.UserService;
import crud.prac.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostsApiController {

   // service -> controller
   private final PostsService postsService;
   private final UserService userService;

   // 저장 Mapping
   @PostMapping("/api/v1/posts")
   public Long save(@RequestBody PostsSaveRequestDto requestDto){
       return postsService.save(requestDto);
   }

   // 수정 Mapping
   @PutMapping("/api/v1/posts/{id}")
   public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto){
       return postsService.update(id, requestDto);
   }
   // 각 게시물 Mapping
   @GetMapping("/api/v1/posts/{id}")
   public PostsResponseDto findById (@PathVariable Long id) {
       return postsService.findById(id);
   }

   // 삭제 Mapping
   @DeleteMapping("/api/v1/posts/{id}")
   public Long delete(@PathVariable Long id){
       postsService.delete(id);
       return id;
   }

   @GetMapping("/api/findbytitle/{title}")
   public ResponseEntity<List<Posts>> findbytitle(@PathVariable String title) {
       return ResponseEntity.ok(postsService.findbytitle(title));
   }

   @PostMapping("/api/review")
   public ResponseEntity<Review> createreview(ReviewRequestDto requestDto) {
       return ResponseEntity.ok(postsService.createreview(requestDto));
   }

   @GetMapping("/api/orederbyviews")
   public ResponseEntity<List<Posts>> orderbyviews() {
       return ResponseEntity.ok(postsService.orderbyviews());
   }

   @PostMapping("/api/likepost")
   public Posts likepost(String title, String nickname) {
       return postsService.likePost(title,nickname);
   }

   @PostMapping("/api/signup")
   public User signup(String nickname, String password) {
       return userService.create(nickname,password);
   }

   @PostMapping("/api/paging")
   public PageDto paging(int nowpage, int interval) {
       List<Posts> posts = postsService.orderbyviews();
       PageDto pageDto = new PageDto(nowpage, posts.size(),interval);
       if (nowpage * interval > posts.size()) {
           for (int i = nowpage * interval - interval; i < posts.size() ; i++) {
               pageDto.addPosts(posts.get(i));
           }
       } else {
           for (int i = nowpage * interval - interval; i < nowpage * interval; i++) {
               pageDto.addPosts(posts.get(i));
           }
       }
       return pageDto;
   }

   @PostMapping("/api/follow")
   public User follow(String nickname1, String nickname2) {
       return userService.follow(nickname1,nickname2);
   }
}
