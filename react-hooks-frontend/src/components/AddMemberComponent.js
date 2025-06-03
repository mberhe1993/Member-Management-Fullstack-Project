import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams } from 'react-router-dom';
import MemberService from '../services/MemberService'

const AddMemberComponent = () => {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [spritualFather, setSpritualFather] = useState('')
    const [dateRegistered, setDateRegistered] = useState('')
    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdateMember = (e) => {
        e.preventDefault();

         if (!firstName || !lastName || !emailId || !phoneNumber || !address) {
        alert("Please fill in all fields before submitting.");
        return;
      }

        const member = {firstName, lastName, emailId, phoneNumber, address, spritualFather, dateRegistered }

        if(id){
            MemberService.updateMember(id, member).then((response) => {
                history.push('/members')
            }).catch(error => {
                console.log(error)
            })

        }else{
            MemberService.createMember(member).then((response) =>{

                console.log(response.data)
    
                history.push('/members');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        MemberService.getMemberById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmailId(response.data.emailId)
            setPhoneNumber(response.data.phoneNumber);
            setAddress(response.data.address)
            setSpritualFather(response.data.spritualFather)
            setDateRegistered(response.data.dateRegistered)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Member</h2>
        }else{
            return <h2 className = "text-center">Add Member</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> First Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Last Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastName"
                                        className = "form-control"
                                        value = {lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email Id"
                                        name = "emailId"
                                        className = "form-control"
                                        value = {emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Phone Number :</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Address :</label>
                                    <input
                                        type = "address"
                                        placeholder = "Enter address"
                                        name = "address"
                                        className = "form-control"
                                        value = {address}
                                        onChange = {(e) => setAddress(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Spiritual Father :</label>
                                    <input
                                        type = "spritualFather"
                                        placeholder = "Enter spiritual father"
                                        name = "spritualFather"
                                        className = "form-control"
                                        value = {spritualFather}
                                        onChange = {(e) => setSpritualFather(e.target.value)}
                                    >

                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Date Registered :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Enter date registered"
                                        name = "dateRegistered"
                                        className = "form-control"
                                        value = {dateRegistered}
                                        onChange={(e) => setDateRegistered(e.target.value)}
                                        max={new Date().toISOString().split("T")[0]} 
                                    />
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateMember(e)} >Submit </button>
                                <Link to="/members" className="btn btn-danger" style={{ marginLeft: "10px" }}> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddMemberComponent
