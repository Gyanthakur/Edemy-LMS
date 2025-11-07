// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import { useParams } from "react-router-dom";
// import { assets } from "../../assets/assets";
// import  humanizeDuration  from "humanize-duration";
// import YouTube from 'react-youtube'
// import Footer from "../../components/student/Footer";
// import Rating from "../../components/student/Rating";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Loading from "../../components/student/Loading";

// const Player = () => {

//   const {enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, fetchUserEnrolledCourses} = useContext(AppContext)
//   const {courseId} = useParams();
//   const [courseData, setCourseData] = useState(null)
//   const [openSections, setOpenSections] = useState({})
//   const [playerData, setPlayerData] = useState(null)
//   const [progressData, setProgressData] = useState(null)
//   const [initialRating, setInitialRating] = useState(0)

//   const getCourseData = () =>{
//     enrolledCourses.map((course)=>{
//       if(course._id === courseId)
//       {
//         setCourseData(course)
// 		course.courseRatings.map((item)=>{
// 			if(item.userId === userData._id){
// 			setInitialRating(item.rating)
// 			}
// 		})
//       }
//     })
//   }

//   const toggleSection = (index) => {
// 		setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
// 	};

//   useEffect(()=>{
// 	if(enrolledCourses.length > 0){
// 		getCourseData()
// 	}
//   },[enrolledCourses])

//   const markLectureAsCompleted = async (lectureId) => {
// 	try {
// 		const token = await getToken();
// 		const {data} = await axios.post(backendUrl + '/api/user/update-course-progress',{courseId, lectureId}, {headers: {Authorization: `Bearer ${token}`}})

// 		if(data.success){
// 			// console.log("data palyer", data);
// 			toast.success(data.message)
// 			getCourseProgress()
// 		}else{
// 			toast.error(data.message)
// 		}
// 	} catch (error) {
// 		toast.error(error.message)
// 	}
//   }

//   const getCourseProgress = async () => {
// 	try {
// 		const token = await getToken();
// 		const {data} = await axios.post(backendUrl + '/api/user/get-course-progress', {courseId}, {headers: {Authorization: `Bearer ${token}`}})

// 		if(data.success){
// 			setProgressData(data.progressData)
// 			toast.success(data.message)
// 		}else{
// 			toast.error(data.message)
// 		}
// 	} catch (error) {
// 		toast.error(error.message)
// 	}
//   }

//   const handleRate = async (rating)=>{
// 	try {
// 		const token = await getToken();

// 		const {data} = await axios.post(backendUrl + '/api/user/add-rating', {courseId, rating},{headers: {Authorization: `Bearer ${token}`}})
// 		console.log("data", data);

// 		if(data.success){
// 			toast.success(data.message)
// 			fetchUserEnrolledCourses();
// 		}
// 		else{
// 			toast.error(data.message)
// 		}

// 	} catch (error) {
// 		toast.error(error.message)
// 	}
//   }

//   useEffect(()=>{
// 	getCourseProgress();
//   },[])

// 	return courseData ? (
// 		<>
// 			<div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
// 				{/* Left column */}
// 				<div className="text-gray-800">
// 					<h2 className="text-xl font-semibold">Course Structure</h2>
// 					<div className="pt-5">
// 						{courseData &&  courseData.courseContent.map((chapter, index) => (
// 							<div
// 								className="border border-gray-300 bg-white mb-2 rounded"
// 								key={index}
// 							>
// 								<div
// 									className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
// 									onClick={() => toggleSection(index)}
// 								>
// 									<div className="flex items-center gap-2">
// 										<img
// 											className={`transform transition-transform ${
// 												openSections[index] ? "rotate-180" : ""
// 											}`}
// 											src={assets.down_arrow_icon}
// 											alt="down_arrow_icon"
// 										/>
// 										<p className="font-medium md:text-base text-sm">
// 											{chapter.chapterTitle}
// 										</p>
// 									</div>
// 									<p className="text-sm md:text-default">
// 										{chapter.chapterContent.length} lectures -{" "}
// 										{calculateChapterTime(chapter)}{" "}
// 									</p>
// 								</div>

// 								<div
// 									className={`overflow-hidden transition-all duration-300 ${
// 										openSections[index] ? "max-h-9g" : "max-h-0"
// 									}`}
// 								>
// 									<ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
// 										{chapter.chapterContent.map((lecture, i) => (
// 											<li key={i} className="flex items-start gap-2 py-1">
// 												<img onClick={() =>
// 																	setPlayerData({
//                                     ...lecture, chapter: index + 1, lecture: i+1
//                                   })}

// 													className="w-4 h-4 mt-1 cursor-pointer"
// 													src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon}
// 													alt="play_icon"
// 												/>
// 												<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
// 													<p>{lecture.lectureTitle}</p>
// 													<div className="flex gap-2">
// 														{lecture.lectureUrl && (
// 															<p
// 																onClick={() =>
// 																	setPlayerData({
//                                     ...lecture, chapter: index + 1, lecture: i+1
//                                   })
// 																}
// 																className="text-blue-500 cursor-pointer"
// 															>
// 																Watch
// 															</p>
// 														)}
// 														<p>
// 															{humanizeDuration(
// 																lecture.lectureDuration * 60 * 1000,
// 																{ units: ["h", "m"] }
// 															)}
// 														</p>
// 													</div>
// 												</div>
// 											</li>
// 										))}
// 									</ul>
// 								</div>
// 							</div>
// 						))}
// 					</div>

//             <div className=" flex items-center gap-2 py-3 mt-10 ">
//               <h1 className="text-xl font-bold">Rate this Course:</h1>
//               <Rating initialRating={initialRating} onRate={handleRate}/>
//             </div>

// 				</div>

// 				{/* right column */}
// 				<div className="md:mt-10">
//           {playerData ? (
//             <div className="">
//               <YouTube videoId={playerData.lectureUrl.split('/').pop()}  iframeClassName="w-full aspect-video"/>

//               <div className="flex justify-between items-center mt-1">
//                 <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle} </p>
//                 <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className="text-blue-600">{progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark As Complete'}</button>
//               </div>
//             </div>
//           )
//           :
// 		//   in this image course thumbnail will be shown player icon will be shown the above thumbnail
//           <img src={courseData ? courseData.courseThumbnail : ''} alt="courseThumbnail" />

//         }
//         </div>
// 			</div>
//       <Footer/>
// 		</>
// 	)
// 	: <Loading/>;
// };

// export default Player;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const Player = () => {
	const {
		enrolledCourses,
		calculateChapterTime,
		backendUrl,
		getToken,
		userData,
		fetchUserEnrolledCourses,
	} = useContext(AppContext);
	const { courseId } = useParams();
	const [courseData, setCourseData] = useState(null);
	const [openSections, setOpenSections] = useState({});
	const [playerData, setPlayerData] = useState(null);
	const [progressData, setProgressData] = useState(null);
	const [initialRating, setInitialRating] = useState(0);

	// New states to manage YouTube loading/playing
	const [isLoadingVideo, setIsLoadingVideo] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const getCourseData = () => {
		enrolledCourses.map((course) => {
			if (course._id === courseId) {
				setCourseData(course);
				course.courseRatings.map((item) => {
					if (item.userId === userData._id) {
						setInitialRating(item.rating);
					}
				});
			}
		});
	};

	const toggleSection = (index) => {
		setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	useEffect(() => {
		if (enrolledCourses.length > 0) {
			getCourseData();
		}
	}, [enrolledCourses]);

	const markLectureAsCompleted = async (lectureId) => {
		try {
			const token = await getToken();
			const { data } = await axios.post(
				backendUrl + "/api/user/update-course-progress",
				{ courseId, lectureId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (data.success) {
				toast.success(data.message);
				getCourseProgress();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const getCourseProgress = async () => {
		try {
			const token = await getToken();
			const { data } = await axios.post(
				backendUrl + "/api/user/get-course-progress",
				{ courseId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (data.success) {
				setProgressData(data.progressData);
				// don't show toast here every time if noisy
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleRate = async (rating) => {
		try {
			const token = await getToken();

			const { data } = await axios.post(
				backendUrl + "/api/user/add-rating",
				{ courseId, rating },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (data.success) {
				toast.success(data.message);
				fetchUserEnrolledCourses();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getCourseProgress();
	}, []);

	// Helper: get first lecture object (if exists)
	const getFirstLecture = () => {
		if (!courseData) return null;
		for (let i = 0; i < courseData.courseContent.length; i++) {
			const chapter = courseData.courseContent[i];
			if (chapter.chapterContent && chapter.chapterContent.length > 0) {
				const lecture = chapter.chapterContent[0];
				// attach chapter/lecture numbers in same shape you use elsewhere
				return { ...lecture, chapter: i + 1, lecture: 1 };
			}
		}
		return null;
	};

	// When user clicks thumbnail/play overlay, open first lecture
	const handleThumbnailClick = () => {
		const first = getFirstLecture();
		if (first) {
			setPlayerData(first);
		} else {
			toast.info("No lectures available to play.");
		}
	};

	// Reset loading/playing states when playerData changes
	useEffect(() => {
		if (playerData) {
			setIsLoadingVideo(true);
			setIsPlaying(false);
		} else {
			setIsLoadingVideo(false);
			setIsPlaying(false);
		}
	}, [playerData]);

	// YouTube callbacks
	const onPlayerReady = (event) => {
		// attempt to start playback (autoplay may be blocked by browser)
		try {
			event.target.playVideo();
		} catch (e) {
			// ignore
		}
	};

	const onPlayerStateChange = (event) => {
		// YouTube player states: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering
		const state = event.data;
		if (state === 1) {
			// playing
			setIsPlaying(true);
			setIsLoadingVideo(false);
		} else if (state === 3) {
			// buffering
			setIsLoadingVideo(true);
		} else if (state === 0 || state === 2 || state === -1) {
			// ended / paused / unstarted - hide loading but mark playing false
			setIsPlaying(false);
			setIsLoadingVideo(false);
		}
	};

	const youtubeOpts = {
		width: "100%",
		playerVars: {
			autoplay: 1, // ask to autoplay
		},
	};

	return courseData ? (
		<>
			<div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
				{/* Left column */}
				<div className="text-gray-800">
					<h2 className="text-xl font-semibold">Course Structure</h2>
					<div className="pt-5">
						{courseData &&
							courseData.courseContent.map((chapter, index) => (
								<div
									className="border border-gray-00 bg-white mb-2 rounded"
									key={index}
								>
									<div
										className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
										onClick={() => toggleSection(index)}
									>
										<div className="flex items-center gap-2">
											<img
												className={`transform transition-transform ${
													openSections[index] ? "rotate-180" : ""
												}`}
												src={assets.down_arrow_icon}
												alt="down_arrow_icon"
											/>
											<p className="font-medium md:text-base text-sm">
												{chapter.chapterTitle}
											</p>
										</div>
										<p className="text-sm md:text-default">
											{chapter.chapterContent.length} lectures -{" "}
											{calculateChapterTime(chapter)}{" "}
										</p>
									</div>

									<div
										className={`overflow-hidden transition-all duration-300 ${
											openSections[index] ? "max-h-9g" : "max-h-0"
										}`}
									>
										<ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
											{chapter.chapterContent.map((lecture, i) => (
												<li key={i} className="flex items-start gap-2 py-1">
													<img
														onClick={() =>
															setPlayerData({
																...lecture,
																chapter: index + 1,
																lecture: i + 1,
															})
														}
														className="w-4 h-4 mt-1 cursor-pointer"
														src={
															progressData &&
															progressData.lectureCompleted.includes(
																lecture.lectureId
															)
																? assets.blue_tick_icon
																: assets.play_icon
														}
														alt="play_icon"
													/>
													<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
														<p>{lecture.lectureTitle}</p>
														<div className="flex gap-2">
															{lecture.lectureUrl && (
																<p
																	onClick={() =>
																		setPlayerData({
																			...lecture,
																			chapter: index + 1,
																			lecture: i + 1,
																		})
																	}
																	className="text-blue-500 cursor-pointer"
																>
																	Watch
																</p>
															)}
															<p>
																{humanizeDuration(
																	lecture.lectureDuration * 60 * 1000,
																	{ units: ["h", "m"] }
																)}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
					</div>

					<div className="flex items-center gap-2 py-3 mt-10 ">
						<h1 className="text-xl font-bold">Rate this Course:</h1>
						<Rating initialRating={initialRating} onRate={handleRate} />
					</div>
				</div>

				{/* right column */}
				<div className="md:mt-10">
					{playerData ? (
						<div className="relative">
							{/* show Loading spinner while buffering/not playing */}
							{isLoadingVideo && (
								<div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
									<Loading />
								</div>
							)}

							<YouTube
								videoId={playerData.lectureUrl.split("/").pop()}
								iframeClassName="w-full aspect-video"
								opts={youtubeOpts}
								onReady={onPlayerReady}
								onStateChange={onPlayerStateChange}
							/>

							<div className="flex justify-between items-center mt-1">
								<p>
									{playerData.chapter}.{playerData.lecture}{" "}
									{playerData.lectureTitle}{" "}
								</p>
								<button
									onClick={() => markLectureAsCompleted(playerData.lectureId)}
									className="text-blue-600"
								>
									{progressData &&
									progressData.lectureCompleted.includes(playerData.lectureId)
										? "Completed"
										: "Mark As Complete"}
								</button>
							</div>
						</div>
					) : (
						// Thumbnail with a centered play icon overlay. Click to open first lecture.
						<div
							className="relative cursor-pointer select-none"
							onClick={handleThumbnailClick}
						>
							<img
								src={courseData ? courseData.courseThumbnail : ""}
								alt="courseThumbnail"
								className="w-full object-cover aspect-video rounded"
							/>

							{/* dark overlay to make play icon pop */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div
									className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 shadow-xl transform transition-transform duration-300 hover:shadow-2xl cursor-pointer"
								>
									<img
										src={assets.play_icon}
										alt="play_overlay"
										className="w-8 h-8 transform transition-transform duration-300 hover:scale-110"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	) : (
		<Loading />
	);
};

export default Player;
