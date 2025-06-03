package net.javaguides.springboot.MemberControllerSpec;

import net.javaguides.springboot.service.MemberService;
import net.javaguides.springboot.controller.MemberController;
import net.javaguides.springboot.model.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

public class MemberControllerSpec {

    @Mock
    private MemberService memberService;

    @InjectMocks
    private MemberController memberController;

    private Member member;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
        member = new Member(1L, "John", "Doe","John@example.com","12345621"
                ,"123 Main St", "Kesis Teweldemedhin", LocalDate.now());
    }

    @Test
    void testGetAllMembers(){
        when(memberService.findAllMembers()).thenReturn(List.of(member));
        assertEquals(1, memberController.getAllMembers().size() );
    }

    @Test
    void testCreateMember(){
        when(memberService.save(any(Member.class))).thenReturn(member);
        Member createdMember = memberController.createMember(member);
        assertEquals(member.getFirstName(), createdMember.getFirstName());
        assertEquals(member.getLastName(), createdMember.getLastName());
    }
    @Test
    void testGetMemberById(){
        when(memberService.findById(1L)).thenReturn(Optional.of(member));
        ResponseEntity<Member> response = memberController.getMemberById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode() );
        assertEquals(member, response.getBody());
    }

    @Test
    void testUpdateMember(){
        when(memberService.findById(1L)).thenReturn(Optional.of(member));
        when(memberService.save(any(Member.class))).thenReturn(member);
        ResponseEntity<Member> response = memberController.updateMember(1L, member);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testDeleteMember() {
        when(memberService.findById(1L)).thenReturn(Optional.of(member));
        doNothing().when(memberService).delete(member);
        ResponseEntity<HttpStatus> response = memberController.deleteMember(1L);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
