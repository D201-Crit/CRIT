package fileUpload.fileUpload.fileUpload;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

/*shift + f10 재실행*/
@Controller
public class BoardController {

	@Autowired
	private BoardService boardService;

	@GetMapping("/board/write") //어떤 url로 접근할 것인지 정해주는 어노테이션 //localhost:8080/board/write
	public String boardWriteForm() {
		return "boardwrite";
	}

	//여기에도 MultipartFile file 받아줌 //예외처리
	@PostMapping("/board/writepro")
	public String boardWritePro(testboard testboard, Model model, MultipartFile file)throws Exception{

		boardService.write(testboard, file);

		//메세지띄우기2
		model.addAttribute("message","글작성이 완료되었습니다");
		model.addAttribute("searchUrl","/board/list");

		return "message";
	}

	@GetMapping("/board/list")
	public String boardList(Model model){
		//BoardService에서 만들어준 boardList가 반환되는데, list라는 이름으로 받아서 넘기겠다는 뜻
		model.addAttribute("list" , boardService.boardList()); //4번
		return "boardList";
	}

	@GetMapping("/board/view") //localhost:8080/board/view?id=1 //(get방식 파라미터)
	public String boardView(Model model, Long id){
		model.addAttribute("testboard", boardService.boardview(id));
		return "boardview";
	}

	@GetMapping("/board/delete")
	public String boardDelete(Long id){

		boardService.boardDelete(id);
		//게시물삭제하고 게시물리스트로 넘어가야하므로
		return "redirect:/board/list";
	}

	//PathVariable이라는 것은 modify 뒤에있는 {id}부분이 인식이되서 Integer형태의 id로 들어온다는것
	@GetMapping("/board/modify/{id}")
	public String boardModify(@PathVariable("id") Long id, Model model){

		//상세페이지에 있는 내용과, 수정페이지의 내용이 같기때문에 위 코드와 같은 것을 확인할수있다
		model.addAttribute("testboard", boardService.boardview(id));

		return "boardmodify";
	}

	//수정부분에도 MultipartFile 와 throw IOEException 추가
	@PostMapping("/board/update/{id}")
	public String boardUpdate(@PathVariable("id") Long id, testboard testboard, MultipartFile file)throws Exception {
		//기존에있던글이 담겨져서온다.
		testboard testboardTemp = boardService.boardview(id);

		//기존에있던 내용을 새로운 내용으로 덮어씌운다.
		testboardTemp.setTitle(testboard.getTitle());
		testboardTemp.setContent(testboard.getContent());

		boardService.write(testboardTemp, file); //추가 → 수정한내용을 boardService의 write부분에 넣기

		return "redirect:/board/list";
	}


}