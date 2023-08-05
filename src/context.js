// Importing dependencies 
import { createContext, useContext, useState , useEffect , useRef } from "react";

// Importing toast 
import {toast} from 'react-toastify';

//  contextAPI , 
const contactApi = createContext();
// exporting the value from this file, 
export function useValue(){
    const value = useContext(contactApi);
    return value;
}
// main function
function CustomeContext({children}){
    // States for storing the contact list in the local state
    const [contactList, setContactList] = useState([]);
    // for checking if it is delying the action or not
    const [isLoading, setIsLoading] = useState(false);
    // ref is used for updating and adding in the local state of the contactList
    const nameRef = useRef();
    const emailRef = useRef();
    const numberRef = useRef();

    // fucntion whill help to fetch the contact from the List
    const fetchContactList = async() =>{
        setIsLoading(true);
        let data = await fetch('https://jsonplaceholder.typicode.com/users/');
        let contact = await data.json();
        // console.log(contact);
        setContactList(contact);
        setIsLoading(false);
    }


    const deleteContact = (id) => {
        const index = contactList.findIndex((contact) => contact.id === id);
        if (index !== -1) {
          let newContactList = [...contactList];
          newContactList.splice(index, 1);
    
          toast.success("Contact Deleted Successfully !");
          setContactList(newContactList);
        }
    };
   
    const handleClear = ()=>{
        nameRef.current.value = "";
        emailRef.current.value = "";
        numberRef.current.value = "";
    }
      

    useEffect(()=>{
        fetchContactList();
    }, []);

    
    return (
        <>
            <contactApi.Provider value={{contactList, setContactList, isLoading, setIsLoading, deleteContact
                                        ,nameRef, emailRef ,numberRef, handleClear}}>
                {children}
            </contactApi.Provider>
        </>
    )

}

export default CustomeContext;