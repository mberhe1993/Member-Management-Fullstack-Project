package net.javaguides.springboot.service;

import net.javaguides.springboot.model.Member;
import net.javaguides.springboot.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public  List<Member>findAllMembers() {
        return memberRepository.findAll();
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }

    public Optional<Member> findById(long id) {
        return memberRepository.findById(id);
    }

    public void delete(Member member) {
        memberRepository.delete(member);
    }

}
