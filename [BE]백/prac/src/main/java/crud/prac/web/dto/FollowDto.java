package crud.prac.web.dto;

import crud.prac.domain.Follow;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
public class FollowDto {
    private List<Follow> followers = new ArrayList<>();
    private List<Follow> followwings = new ArrayList<>();

    @Builder
    public FollowDto(List<Follow> followers, List<Follow> followwings) {
        this.followers = followers;
        this.followwings = followwings;
    }
}
