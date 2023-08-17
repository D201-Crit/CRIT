package com.ssafy.crit.pay.repository;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.pay.entity.Pay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PayRepository extends JpaRepository<Pay, Long> {
    public List<Pay> findAllByUser(User user) throws Exception;

}
