// importing loader
import Loader from "../Loader/Loader";
// importing  contactAPI
import { useValue } from "../../context";
// Importing Style
import Style from './Home.module.css';
// Importing dependiences from the react-router-dom
import { Link } from "react-router-dom";


function Home() {
    
    const {contactList, isLoading , deleteContact} = useValue();

    if(isLoading){
        return <Loader />
    }
    // UI for the Home Page
    return (
        <>
            <div className={Style.addContact}>
                {/* Button for adding the contact */}
                <Link to = 'add-contact'>
                    <button>Create New Contact</button>
                </Link>
            </div>
            {/* UI for the contact Table */}
            <div className={Style.contactTable}>
                <table className="table">
                    <thead>
                        
                        <tr className={Style.tableHead}>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {contactList.map((contact, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <Link to= {`edit-contact/${contact.id}`}>
                                        <button className={Style.editButton}>Modify</button>
                                    </Link>
                                    
                                    <button onClick={()=>deleteContact(contact.id)} className={Style.deleteButton}>
                                        Remove
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    ) 
}

export default Home;