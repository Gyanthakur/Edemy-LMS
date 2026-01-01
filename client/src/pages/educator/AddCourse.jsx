import React, { act, useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import Logger from '../../components/Logger'
import Signature from '../../components/Signature'


const AddCourse = () => {

  const { backendUrl, getToken,} = useContext(AppContext)


  const quillRef =  useRef(null)
  const editorRef =  useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration:'',
    lectureUrl:'',
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if(action === 'add'){
      const title = prompt('Enter Chapter Name:');
      if(title){
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters,newChapter]);
      }
    } else if(action === 'remove'){
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    }
    else if(action === 'toggle'){
      setChapters(
        chapters.map((chapter) => 
          chapter.chapterId === chapterId ? {...chapter,collapsed: !chapter.collapsed}: chapter
        )
      );
    }
  };




  const handleLecture = (action, chapterId, lectureIndex) => {
    if(action === 'add'){
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }else if(action === 'remove'){
      setChapters(
        chapters.map((chapter)=> {
          if(chapter.chapterId === chapterId){
            chapter.chapterContent.splice(lectureIndex,1);
          }
          return chapter;
        })
      );
    }
  };


  const addLecture = ()=>{
    setChapters(
      chapters.map((chapter)=> {
        if(chapter.chapterId === currentChapterId){
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          // console.log("LectureId" , lectureId);
          console.log("Lecture" , newLecture);
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      if (!image) {
        toast.error("Thumbnail Not Selected");
        return; // Prevent further execution
      }
  
      // if (!chapters.length) {
      //   toast.error("At least one chapter is required!");
      //   return;
      // }
  
      // // Ensure each chapter has a chapter order
      // const updatedChapters = chapters.map((ch, index) => ({
      //   ...ch,
      //   chapterorder: ch.chapterorder || index + 1, // Auto-assign order if missing
      // }));
  
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        // isPublished: true, // ✅ Fix: Include isPublished field
        courseContent: chapters,
      };
  
      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData)); // ✅ Ensure courseData is sent as JSON
      formData.append("image", image); // ✅ Ensure image is sent correctly
  
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/educator/add-course",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("data", data);
  
      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };



//  const handleSubmit = async (e) => {
//   try {
//     e.preventDefault();

//     if (!image) {
//       toast.error("Thumbnail Not Selected");
//       return; // Prevent further execution
//     }

//     if (!chapters.length) {
//       toast.error("At least one chapter is required!");
//       return;
//     }

//     // Ensure each chapter has a chapter order
//     const updatedChapters = chapters.map((ch, index) => ({
//       ...ch,
//       chapterorder: ch.chapterorder || index + 1, // Auto-assign order if missing
//     }));

//     const courseData = {
//       courseTitle,
//       courseDescription: quillRef.current.root.innerHTML,
//       coursePrice: Number(coursePrice),
//       discount: Number(discount),
//       isPublished: true, // ✅ Fix: Include isPublished field
//       courseContent: updatedChapters,
//     };

//     const formData = new FormData();
//     formData.append("courseData", JSON.stringify(courseData)); // ✅ Ensure courseData is sent as JSON
//     formData.append("image", image); // ✅ Ensure image is sent correctly

//     const token = await getToken();
//     const { data } = await axios.post(
//       backendUrl + "/api/educator/add-course",
//       formData,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     console.log("data", data);

//     if (data.success) {
//       toast.success(data.message);
//       setCourseTitle("");
//       setCoursePrice(0);
//       setDiscount(0);
//       setImage(null);
//       setChapters([]);
//       quillRef.current.root.innerHTML = "";
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     toast.error(error.message);
//     console.log(error.message);
//   }
// };

  useEffect(()=>{
    // initiate Quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current,{
        theme: 'snow',
      })
    }

  },[])






  return (
    <>
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
      <div className="block sm:hidden ">
					<Logger/>
			</div>
        <div className='flex flex-col gap-1'>
          <p>Course Title: </p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />

        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description:</p>
          <div ref={editorRef}></div>
        </div>


        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' className='outline-none md:py-2.5 w-28 py-2 px-3 rounded border border-gray-500' required />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3 mt-5'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="file_upload_icon"  className='p-3 bg-blue-500 rounded'/>
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept="image/*" hidden />
              <img className='max-h-10' src={image ? URL.createObjectURL(image) : ''} alt="" />
            </label>
          </div>

        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input onChange={e => setDiscount(e.target.value)} value={discount} type="number" placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-gray-500' required />

        </div>

          {/* Adding chapters & lectures  */}
          <div>
            {chapters.map((chapter,chapterIndex) => (
              <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
                <div className='flex justify-between items-center p-4 border-b'>
                  <div className='flex items-center'>
                  <img onClick={()=> handleChapter('toggle', chapter.chapterId)} width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} src={assets.dropdown_icon} alt="" />
                  <span className='font-semibold'> {chapterIndex + 1} {chapter.chapterTitle} </span>

                  </div>
                  <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>

                  <img onClick={()=> handleChapter('remove',chapter.chapterId)} className='cursor-pointer'  src={assets.cross_icon} alt="" />


                </div>
                {!chapter.collapsed && (
                  <div className='p-4'>
                    {chapter.chapterContent.map((lecture,lectureIndex)=>(
                      <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                        <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'} </span>
                        <img onClick={()=> handleLecture('remove', chapter.chapterId, lectureIndex)} src={assets.cross_icon} alt="" className='cursor-pointer'/>
                      </div>
                    ))}
                    <div onClick={()=> handleLecture('add', chapter.chapterId)} className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'>+ Add Lectures</div>


                  </div>
                )}

              </div>
            ))}
            <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=>handleChapter('add')}>+ Add Chapter</div>
            {
              showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                  <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                    <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                    <div className='mb-2'>
                      <p>Lecture Title</p>
                      <input type="text"
                      className='mt-1 block w-full border rounded py-1 px-2'
                      value={lectureDetails.lectureTitle}
                      onChange={(e) => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}
                      />
                    </div>

                    <div className='mb-2'>
                      <p>Duration (minutes)</p>
                      <input 
                      type="number"
                      className='mt-1 block w-full border rounded py-1 px-2'
                      value={lectureDetails.lectureDuration}
                      onChange={(e) => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}
                      />
                    </div>

                    <div className='mb-2'>
                      <p>Lecture URL </p>
                      <input 
                      type="text"
                      className='mt-1 block w-full border rounded py-1 px-2'
                      value={lectureDetails.lectureUrl}
                      onChange={(e) => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}
                      />
                    </div>

                    <div className='mb-2'>
                      <p>Is Preview Free? </p>
                      <input 
                      type="checkbox"
                      className='mt-1 block w-full border rounded py-1 px-2'
                      value={lectureDetails.isPreviewFree}
                      // onClick={(e) => setLectureDetails({...lectureDetails, isPreviewFree: e.target.value})}
                      onClick={(e) => setLectureDetails({...lectureDetails, isPreviewFree: true})}
                      />
                    </div>

                    <button className='w-full bg-blue-400 text-white px-4py2
                     rounded' onClick={addLecture} type='button'>Add</button>

                     <img onClick={()=> setShowPopup(false)} className='absolute top-4 right-4 w-4 cursor-pointer' src={assets.cross_icon} alt="" />


                  </div>

                </div>
              )
            }
          </div>
            <button type='submit' className='bg-black font-semibold text-white w-max pt-2.5 px-8 py-2 rounded my-4'>ADD</button>

      </form>
      
    </div>
    <Signature/>
    </>
  )
}

export default AddCourse
