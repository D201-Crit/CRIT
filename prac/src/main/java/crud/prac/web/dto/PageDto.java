package crud.prac.web.dto;

import crud.prac.domain.posts.Posts;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
public class PageDto {

    private int nowpage; // 현재 페이지
    private int startpage; // 시작 페이지 표기
    private int endpage; // 끝 페이지 표기
    private int total; // 전체 게시물 수
    private boolean prev, next; // 이전, 다음 페이지 활성화 여부
    private int interval; // 한 페이지당 게시물 수 몇개?

    private List<Posts> postsList = new ArrayList<>();


    public PageDto(int nowpage, int total, int interval) {
        this.nowpage = nowpage;
        this.total = total;
        this.interval = interval;

        this.endpage = (int)(Math.ceil(nowpage/5.0))*5;
        this.startpage = this.endpage - 4;
        int realend = (int)(Math.ceil(total * 1.0 / interval));

        /* 전체 마지막 페이지(realend)가 화면에 보이는 마지막페이지(endPage)보다 작은 경우, 보이는 페이지(endPage) 값 조정 */
        if(realend < this.endpage) {
            this.endpage = realend;
        }

        /* 시작 페이지(startPage)값이 1보다 큰 경우 true */
        this.prev = this.startpage > 1;

        /* 마지막 페이지(endPage)값이 1보다 큰 경우 true */
        this.next = this.endpage < realend;
    }
    public void addPosts(Posts posts) {
        postsList.add(posts);
    }
}
