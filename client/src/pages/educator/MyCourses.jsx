import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import Logger from "../../components/Logger";
import Signature from "../../components/Signature";

const MyCourses = () => {
	const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
	const [courses, setCourses] = useState(null);

	const fetchEducatorCourses = async () => {
		// setCourses(allCourses)
		try {
			const token = await getToken();
			const { data } = await axios.get(backendUrl + "/api/educator/courses", {
				headers: { Authorization: `Bearer ${token}` },
			});
			// console.log("data", data.courses);

			data.success && setCourses(data.courses);
		} catch (error) {
			toast.error(error.message);
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (isEducator) {
			fetchEducatorCourses();
		}
	}, [isEducator]);

	return courses ? (
		<div className="h-full mb-10 flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
			<div className="w-full">
				<div className="block sm:hidden ">
					<Logger />
				</div>
				<h2 className=" pb-4 text-lg font-medium">My Courses</h2>
				<div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
					<table className="md:table-auto table-fixed w-full overflow-hidden">
						<thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
							<tr>
								<th className="px-4 py-3 font-semibold truncate">
									All Courses
								</th>
								<th className="px-4 py-3 font-semibold truncate">
									Courses Price
								</th>
								<th className="px-4 py-3 font-semibold truncate">Earnings</th>
								<th className="px-4 py-3 font-semibold truncate">Students</th>
								<th className="px-4 py-3 font-semibold truncate">
									Course Status
								</th>
							</tr>
						</thead>

						<tbody className="text-sm text-gray-500">
							{courses.map((course) => (
								<tr key={course._id} className="border-b border-gray-500/20 ">
									<td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
										<img
											src={course.courseThumbnail}
											alt="CoureImage"
											className="w-16"
										/>
										<span className="truncate hidden md:block">
											{course.courseTitle}
										</span>
									</td>
									<td className="px-4 py-3">
										{course.coursePrice -
											(course.discount * course.coursePrice) / 100 ===
										0
											? ""
											: "$"}{" "}
										{course.coursePrice -
											(course.discount * course.coursePrice) / 100 ===
										0
											? "Free"
											: course.coursePrice -
											  (course.discount * course.coursePrice) / 100}{" "}
									</td>
									<td className="px-4 py-3">
										{currency}{" "}
										{Math.floor(
											course.enrolledStudents.length *
												(course.coursePrice -
													(course.discount * course.coursePrice) / 100)
										).toFixed(2)}{" "}
									</td>

									<td className="px-4 py-3">
										{course.enrolledStudents.length}
									</td>
									<td className="px-4 py-3">
										{new Date(course.createdAt).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Signature />
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default MyCourses;
