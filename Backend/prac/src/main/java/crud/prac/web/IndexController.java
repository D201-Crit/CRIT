//package crud.prac.web;
//
//import crud.prac.service.PostsService;
//import crud.prac.web.dto.PostsResponseDto;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//@RequiredArgsConstructor
//@Controller
//public class IndexController {
//    private final PostsService postsService;
//
//    // index 페이지
//    @GetMapping("/")
//    public String index(Model model) {
//        model.addAttribute("posts", postsService.findAllDesc());
//
//        return "index";
//    }
//
//    // posts 저장
//    @GetMapping("/posts/save")
//    public String postsSave() {
//        return "posts-save";
//    }
//
//    // posts 업데이트
//    @GetMapping("/posts/update/{id}")
//    public String postsUpdate(@PathVariable Long id, Model model){
//        PostsResponseDto dto = postsService.findById(id);
//        model.addAttribute("post", dto);
//
//        return "posts-update";
//    }
//}
