import React, { useState } from 'react'
import { useAuth } from '../store/auth'

const Donate = () => {
    const [userData, setUserData] = useState(true)
    const {user} = useAuth();

    if(userData && user){
        
    }
    
  return (
    <div>
      Donate us
    </div>
  )
}

export default Donate
