import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

import SocialIcons from "../SocialIcons";

const Footer = () => {
	// Added subscription state
	const [subscribeEmail, setSubscribeEmail] = useState("");

	// Added subscription handler
	const handleSubscribe = () => {
		// Replace this with your subscription API integration if needed
		console.log("Subscribed with:", subscribeEmail);
		alert(`Subscribed with: ${subscribeEmail}`);
		setSubscribeEmail("");
	};

	return (
		<footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
			<div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
				<div className="flex flex-col md:items-start items-center w-full">
					<img src={assets.logo_dark} alt="logo" />
					<p className="mt-6 text-center sm:flex sm:flex-row sm:justify-center  md:text-left text-sm text-white/80">
						Edemy LMS makes education accessible and engaging, connecting
						students with educators through quality courses, interactive tools,
						and intuitive design.
					</p>
				</div>
				<div className="flex flex-col md:items-start items-center w-full">
					<h2 className="font-semibold text-white mb-5">Company</h2>
					<ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About us</Link>
						</li>
						<li>
							<Link to="/contact">Contact us</Link>
						</li>
						<li>
							<Link to="/privacy-policy">Privacy policy</Link>
						</li>
					</ul>
				</div>
				<div className="md:flex flex-col items-start w-full">
					<h2 className="font-semibold text-white mb-5">
						Subscribe to our newsletter
					</h2>
					<p className="text-sm text-white/80">
						The latest news, articles, and resources, sent to your inbox weekly.
					</p>
					<div className="flex items-center gap-2 pt-4">
						<input
							type="email"
							placeholder="Enter your email"
							className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-100 outline-none w-64 h-9 rounded px-2 text-sm"
							value={subscribeEmail}
							onChange={(e) => setSubscribeEmail(e.target.value)}
						/>
						<button
							onClick={handleSubscribe}
							className="bg-blue-600 w-2/4 h-9 text-white rounded"
						>
							Subscribe
						</button>
					</div>
					<div className=" ml-8 mt-5 md:ml-0 md:mt-0">

					<SocialIcons />
					</div>
				</div>
			</div>
			<p className="py-4 text-center text-xs md:text-sm text-white/60">
				Copyright 2025 © Edemy by GPS. All Right Reserved.
			</p>
		</footer>
	);
};

export default Footer;
