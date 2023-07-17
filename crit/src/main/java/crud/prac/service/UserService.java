package crud.prac.service;

import crud.prac.domain.Follow;
import crud.prac.domain.Member;
import crud.prac.domain.repository.FollowRepository;
import crud.prac.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public Member create(String nickname, String password) {
        if (userRepository.findByNickname(nickname).isEmpty()) {
            Member member = Member.builder()
                    .nickname(nickname)
                    .password(password).build();
            userRepository.save(member);
            return member;
        } else {
            Member member = userRepository.findByNickname(nickname).get();
            return member;
        }
    }

    public Member follow(String nickname1, String nickname2) { // nickname2가 nickname1(나)를 팔로잉
        Member member1 = userRepository.findByNickname(nickname1).get();
        Member member2 = userRepository.findByNickname(nickname2).get();
        if (followRepository.findByFollowerAndFollowing(member1, member2).isEmpty()) {
            Follow follow = Follow.builder()
                    .follower(member1)
                    .following(member2).build();
            followRepository.save(follow);
            member1.adduserTofollower(follow);
            member2.adduserTofollowing(follow);
            return member1;
//            return FollowDto.builder()
//                    .followers(user1.getFollowers())
//                    .followwings(user1.getFollowings()).build();
        } else {
            Follow follow = followRepository.findByFollowerAndFollowing(member1, member2).get();
            member1.removeuserTofollower(follow);
            member2.removeuserTofollowing(follow);
            followRepository.deleteByFollowerAndFollowing(member1, member2);
            return member1;
//            return FollowDto.builder()
//                    .followers(user1.getFollowers())
//                    .followwings(user1.getFollowings()).build();
        }
    }
}
