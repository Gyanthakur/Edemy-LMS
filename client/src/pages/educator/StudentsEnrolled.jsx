import React, { useContext, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Logger from '../../components/Logger'

const StudentsEnrolled = () => {

  const {backendUrl, getToken, isEducator} = useContext(AppContext)

  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () =>{
    // setEnrolledStudents(dummyStudentEnrolled);
    try {
      const token = await getToken();
      const {data} = await axios.get(backendUrl + '/api/educator/enrolled-students', { headers: { Authorization: `Bearer ${token}` } })
      // console.log("data", data.enrolledStudents);
      

      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse())
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isEducator){
      fetchEnrolledStudents();

    }
  },[isEducator])


  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 mb-10'>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
      <div className="block sm:hidden mt-2">
					<Logger/>
			</div>
      <table className='table-fixed md:table-auto w-full overflow-hidden pb-4'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
            <th className='px-4 py-3 font-semibold '>Student name</th>
            <th className='px-4 py-3 font-semibold '>Course Title</th>
            <th className='px-4 py-3 font-semibold '>Date</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-500">
              {enrolledStudents.map((item,index)=> (
                <tr key={index} className="border-b border-gray-500/20 ">
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img 
                    src={item?.student?.imageUrl || "/student.png"} 
                    alt="image url"
                    className="w-9 h-9 rounded-full bg-teal-200/40 object-cover"
                     />
                     <span className="truncate">{item?.student?.name || "Unknown Student"}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle} </td>
                  <td className='px-4 py-3'>
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>
      </table>

      </div>
    </div>
  ):
  <Loading/>
}

export default StudentsEnrolled
