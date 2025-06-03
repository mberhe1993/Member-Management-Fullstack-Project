import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import MemberService from '../services/MemberService'

const ListMemberComponent = () => {

    const [members, setMembers] = useState([])

    useEffect(() => {

        getAllMembers();
    }, [])

    const getAllMembers = () => {
        MemberService.getAllMembers().then((response) => {
            setMembers(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

   
    const deleteMember = (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
        MemberService.deleteMember(memberId)
            .then(() => getAllMembers())
            .catch(error => console.error(error));
        }
   };


    return (
        <div className = "container">
            <h2 className = "text-center"> List Members </h2>
            <Link to = "/add-member" className = "btn btn-primary mb-2" > Add Member </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Member Id </th>
                    <th>   First Name </th>
                    <th>   Last Name </th>
                    <th>   Email Id </th>
                    <th>   Phone Number </th>
                    <th>   Address </th>
                    <th>   Spiritual Father </th>
                    <th>    date Registered </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        members.map(
                            member =>
                            <tr key = {member.id}> 
                                <td> {member.id} </td>
                                <td> {member.firstName} </td>
                                <td>{member.lastName}</td>
                                <td>{member.emailId}</td>
                                <td>{member.phoneNumber}</td>
                                <td>{member.address}</td>
                                <td>{member.spritualFather}</td>
                                <td>{member.dateRegistered}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                     <Link className="btn btn-info" to={`/edit-member/${member.id}`}>
                                     Update
                                     </Link>
                                    <button
                                     className="btn btn-danger"
                                     onClick={() => deleteMember(member.id)}
                                     >
                                     Delete
                                    </button>
                                </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListMemberComponent
