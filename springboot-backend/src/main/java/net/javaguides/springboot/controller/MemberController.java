package net.javaguides.springboot.controller;

import net.javaguides.springboot.service.MemberService;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    private MemberController(MemberService memberService){
        this.memberService = memberService;
    }

    @GetMapping
    public List<Member> getAllMembers(){
        return memberService.findAllMembers();
    }

    // build create employee REST API
    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberService.save(member);
    }

    // build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable  long id){
        Member member = (Member) memberService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(member);
    }

    // build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<Member> updateMember(@PathVariable long id, @RequestBody Member memberDetails) {
        Member updateMember = (Member) memberService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not exist with id: " + id));

        updateMember.setFirstName(memberDetails.getFirstName());
        updateMember.setLastName(memberDetails.getLastName());
        updateMember.setEmailId(memberDetails.getEmailId());
        updateMember.setPhoneNumber(memberDetails.getPhoneNumber());
        updateMember.setAddress(memberDetails.getAddress());
        updateMember.setSpritualFather(memberDetails.getSpritualFather());
        updateMember.setDateRegistered(memberDetails.getDateRegistered());

        memberService.save(updateMember);

        return ResponseEntity.ok(updateMember);
    }

    // build delete employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteMember(@PathVariable long id){

        Member member = (Member) memberService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        memberService.delete(member);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
