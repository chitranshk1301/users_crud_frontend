import {useQuery} from 'react-query'
import PaginationTable from './components/PaginationTable'
import { createContext, useState } from 'react'
import Header from './components/Header'
import AddUserModal from './components/AddUserModal'
import { getUser } from './api/usersApi'
import { useEffect } from 'react'

export const mutationContext = createContext()



function App() {
  let {data,status,refetch} = useQuery('users',getUser)
  const [onMutation,setOnMutation] = useState(0)

  useEffect(()=>{
    refetch() //eslint-disable-next-line
  },[onMutation])

  const [modal,setModal] = useState(false)

  if(status === 'loading'){
    return <div>Loading..</div>
  }

  if(status === 'error'){
    return <div>Error</div>
  }

  if(status === 'success' && data.length === 0){
    return <div>Loading..</div>
  }

  if(status === 'success' && data.length > 0){
    return (
      <>
      <mutationContext.Provider value={{onMutation,setOnMutation}}>

      
      <div className='w-full px-20 border py-5  ' >
        <div className='shadow-2xl'>
      
          <Header setModal={setModal} data={data}/>
          
          <PaginationTable data={data}  /> 
          {modal &&<AddUserModal setModal={setModal} setOnMutation={setOnMutation}/>}
        </div>
      </div>
      </mutationContext.Provider>
      </>
    )
  }
}

export default App
