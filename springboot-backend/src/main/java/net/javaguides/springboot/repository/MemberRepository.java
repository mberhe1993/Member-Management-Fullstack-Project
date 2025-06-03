package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // all crud database methods
}


