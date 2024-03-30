import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const ParticipantContext = createContext(null);

export const ParticipantProvider = ({children}) => {

    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser} = useContext(UserContext)

  const [currentParticipant, setCurrentParticipant] = useState(() => {

    let participant = localStorage.getItem("Participant");
    
    if(participant){
        return JSON.parse(participant)
    }
    else{
        return null
    }
})

useEffect(()=>{
  fetch(`/api/participant/${currentUser}`)
  .then((response) => response.json())
  .then((parsed) => {
    if(parsed.status === 200){
    function removeDuplicates(arr1, arr2) {
        // Create a set of _ids from arr2 for efficient lookup
        const idsSet = new Set(arr2.map(obj => obj._id));
        
        // Filter arr1 to keep only those objects whose _id is not in idsSet
        const filteredArr1 = arr1.filter(obj => !idsSet.has(obj._id));
    
        // Return the combined unique set
        return filteredArr1.concat(arr2);
        
    }
    const uniqueArray = removeDuplicates(parsed.events.ownerArray, parsed.events.playerArray);
      localStorage.setItem("participant", JSON.stringify(uniqueArray));
      console.log(uniqueArray)
      setCurrentParticipant(uniqueArray)
    }
    })
  .catch((error) => {
      console.log(error)
  })
},[]);


console.log(currentParticipant)

// passing currentParticipant, setCurrentParticipant to all children
  return (
    <ParticipantContext.Provider value={{currentParticipant, setCurrentParticipant}}>
            {children}
    </ParticipantContext.Provider>
  )

};