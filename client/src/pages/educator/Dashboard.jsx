import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import Logger from "../../components/Logger";
import Signature from "../../components/Signature";

const Dashboard = () => {
	const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
	const [dashboardData, setDashboardData] = useState(null);

	const fetchDashboardData = async () => {
		// setDashboardData(dummyDashboardData);
		try {
			const token = await getToken();

			const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
				headers: { Authorization: `Bearer ${token}` },
			});

			// console.log("dashboard data", data.dashboardData);

			if (data.success) {
				setDashboardData(data.dashboardData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (isEducator) {
			fetchDashboardData();
		}
	}, [isEducator]);

	return dashboardData ? (
    <>
		<div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
			<div className="space-y-5 w-full">
				<div className="block sm:hidden ">
					<Logger />
				</div>
				{/* Responsive Grid for Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center w-full">
					<div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-full rounded-md">
						<img src={assets.patients_icon} alt="patients_icon" />
						<div>
							<p className="text-2xl font-medium text-gray-600">
								{dashboardData.enrolledStudentsData.length}
							</p>
							<p className="text-base text-gray-500">Total Enrollments</p>
						</div>
					</div>

					<div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-full rounded-md">
						<img src={assets.appointments_icon} alt="appointments_icon" />
						<div>
							<p className="text-2xl font-medium text-gray-600">
								{dashboardData.totalCourses}
							</p>
							<p className="text-base text-gray-500">Total Courses</p>
						</div>
					</div>

					{/* Fixed Total Earnings Issue */}
					<div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-full rounded-md">
						<img src={assets.earning_icon} alt="earning_icon" />
						<div className="whitespace-nowrap">
							<p className="text-2xl font-medium text-gray-600 text-nowrap">
								{currency}
								{dashboardData.totalEarnings}
							</p>
							<p className="text-base text-gray-500">Total Earnings</p>
						</div>
					</div>
				</div>

				<div className="pt-16 w-full mb-10">
					<h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
					<div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 mb-10">
						<div className="w-full overflow-x-auto">
							<table className="table-fixed md:table-auto w-full overflow-hidden">
								<thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
									<tr>
										<th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
											#
										</th>
										<th className="px-4 py-3 font-semibold">Student Name</th>
										<th className="px-4 py-3 font-semibold">Course Title</th>
									</tr>
								</thead>

								<tbody className="text-sm text-gray-500">
									{dashboardData.enrolledStudentsData.map((item, index) => (
										<tr key={index} className="border-b border-gray-500/20">
											<td className="px-4 py-3 text-center hidden sm:table-cell">
												{index + 1}
											</td>
											<td className="md:px-4 px-2 py-3 flex items-center space-x-3">
												<img
													src={item.student.imageUrl}
													alt="student"
													className="w-9 h-9 rounded-full"
												/>
												<span className="truncate">{item.student.name}</span>
											</td>
											<td className="px-4 py-3 truncate">{item.courseTitle}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
    <Signature/>
    </>
	) : (
		<Loading />
	);
};

export default Dashboard;
