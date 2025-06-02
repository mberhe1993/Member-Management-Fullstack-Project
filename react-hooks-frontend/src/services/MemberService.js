import axios from 'axios'

const MEMBER_BASE_REST_API_URL = 'http://localhost:8080/api/v1/members';

class MemberService{

    getAllMembers(){
        return axios.get(MEMBER_BASE_REST_API_URL)
    }

    createMember(member){
        return axios.post(MEMBER_BASE_REST_API_URL, member)
    }

    getMemberById(memberId){
        return axios.get(MEMBER_BASE_REST_API_URL + '/' + memberId);
    }

    updateMember(memberId, member){
        return axios.put(MEMBER_BASE_REST_API_URL + '/' +memberId, member);
    }

    deleteMember(memberId){
        return axios.delete(MEMBER_BASE_REST_API_URL + '/' + memberId);
    }
}

export default new MemberService();