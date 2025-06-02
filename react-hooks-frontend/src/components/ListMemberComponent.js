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
        MemberService.deleteMember(memberId).then((response) =>{
        getAllMembers();

       }).catch(error =>{
           console.log(error);
       })
        
    }

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
                    <th>   PhoneNumber </th>
                    <th>   Address </th>
                    <th>   Spiritual Father </th>
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
                                <td>
                                    <Link className="btn btn-info" to={`/edit-member/${member.id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteMember(member.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
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
