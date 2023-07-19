package crud.prac.web.dto.shorts;

import crud.prac.domain.FileUpload;
import crud.prac.domain.shorts.HashTagList;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ShortsSaveDto {

    private Long id;
    private String title;
    private List<FileUploadDto> fileUploadList;
    private HashTagListDto hashTagList;




}
