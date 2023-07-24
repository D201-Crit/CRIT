//package crud.prac.service;
//
//import crud.prac.domain.Follow;
//import crud.prac.domain.User;
//import crud.prac.domain.repository.FollowRepository;
//import crud.prac.domain.repository.UserRepository;
//import crud.prac.web.dto.FollowDto;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final FollowRepository followRepository;
//
//    public User create(String nickname, String password) {
//        if (userRepository.findByNickname(nickname).isEmpty()) {
//            User user = User.builder()
//                    .nickname(nickname)
//                    .password(password).build();
//            userRepository.save(user);
//            return user;
//        } else {
//            User user = userRepository.findByNickname(nickname).get();
//            return user;
//        }
//    }
//
//    public User follow(String nickname1, String nickname2) { // nickname2가 nickname1(나)를 팔로잉
//        User user1 = userRepository.findByNickname(nickname1).get();
//        User user2 = userRepository.findByNickname(nickname2).get();
//        if (followRepository.findByFollowerAndFollowing(user1,user2).isEmpty()) {
//            Follow follow = Follow.builder()
//                    .follower(user1)
//                    .following(user2).build();
//            followRepository.save(follow);
//            user1.adduserTofollower(follow);
//            user2.adduserTofollowing(follow);
//            return user1;
////            return FollowDto.builder()
////                    .followers(user1.getFollowers())
////                    .followwings(user1.getFollowings()).build();
//        } else {
//            Follow follow = followRepository.findByFollowerAndFollowing(user1,user2).get();
//            user1.removeuserTofollower(follow);
//            user2.removeuserTofollowing(follow);
//            followRepository.deleteByFollowerAndFollowing(user1,user2);
//            return user1;
////            return FollowDto.builder()
////                    .followers(user1.getFollowers())
////                    .followwings(user1.getFollowings()).build();
//        }
//    }
//}
