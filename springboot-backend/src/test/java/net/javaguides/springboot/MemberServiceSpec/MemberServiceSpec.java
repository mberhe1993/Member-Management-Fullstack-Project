package net.javaguides.springboot.MemberServiceSpec;

import net.javaguides.springboot.model.Member;
import net.javaguides.springboot.repository.MemberRepository;
import net.javaguides.springboot.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MemberServiceSpec {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;

    private Member member;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
        member = new Member(1L, "John", "Doe","John@example.com","12345621"
                ,"123 Main St", "Kesis Teweldemedhin", LocalDate.now());
    }

    @Test
    void testFindAllMembers(){
        when(memberRepository.findAll()).thenReturn(List.of(member));
        List<Member> members = memberService.findAllMembers();
        assertEquals(1, members.size());
        assertEquals(member, members.get(0));

    }


    @Test
    void testCreateMember(){
        when(memberRepository.save(member)).thenReturn(member);
        Member savedMember = memberService.save(member);
        assertNotNull(savedMember);
        assertEquals(member.getFirstName(), savedMember.getFirstName());
    }

    @Test
    void testFindByIdd(){
        when(memberRepository.findById(1L)).thenReturn(Optional.of(member));
        Optional<Member> foundMember = memberService.findById(1L);
        assertTrue(foundMember.isPresent());
        assertEquals(member, foundMember.get());
    }

    @Test
    void testDeleteMember(){
        doNothing().when(memberRepository).delete(member);
        memberService.delete(member);
        verify(memberRepository, times(1)).delete(member);
    }

}
