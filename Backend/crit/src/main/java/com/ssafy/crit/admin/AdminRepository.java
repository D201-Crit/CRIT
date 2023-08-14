package com.ssafy.crit.admin;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository  extends JpaRepository<SuperAdmin, String> {
}
