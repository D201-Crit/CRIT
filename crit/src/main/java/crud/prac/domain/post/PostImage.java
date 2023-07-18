package crud.prac.domain.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * * 230718
 * * 게시글 사진 엔티티
 * * by 조경호
 */

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImage {
    @Id
    @GeneratedValue
    @Column(name = "post_image_id")
    private Long id;

    private String saveFile; // 사진 저장 경로

    private LocalDateTime initDate; // 사진 저장 일자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    /**
     * 누가 등록했는지 필요한가?
     * */


}
