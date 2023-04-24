import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/userSlice";
import { formatTime } from "./LeaderBoard";
import { DeleteModal } from "./DeleteModal";

const formatDate = (date) => {
	let date_obj = new Date(date);

	return date_obj.toLocaleDateString("en-us");
};

export const ProfilePage = () => {
	const user = useSelector(selectCurrentUser);
	const [scores, setScores] = useState([]);
	const [isDeleted, setIsDeleted] = useState(true);

	useEffect(() => {
		async function getScores() {
			const url = `${process.env.REACT_APP_PLAYBOXX_SERVICE_API_HOST}/scores`;

			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error("Failed to fetch scores");
				}
				const data = await response.json();

				let dataSet = data
					.filter((score) => score.player_id.id == user.id)
					.slice(0, 10);

				setScores(dataSet);
			} catch (e) {
				console.error("Error fetching scores", e);
			}
		}
		getScores();
	}, [isDeleted]);

	return (
		<div className="">
			<div className="w-screen h-screen bg-beige">
				{user.profile_picture ? (
					<img
						className="rounded-full mx-auto  w-36 h-36"
						src={user.profile_picture}
						alt="Extra large avatar"
					/>
				) : (
					<img
						className="rounded-full mx-auto w-36 h-36"
						src="https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png"
						alt="Extra large avatar"
					/>
				)}
				<div className="user-info flex flex-col items-center m-7">
					<p className="text-4xl font-bold">
						{user.first_name} {user.last_name}
					</p>
					<p className="text-lg font-semibold">Username: {user.username}</p>
					{/* <p>User ID: {user.id}</p> */}
					<p className="text-md font-medium">Email: {user.email}</p>
				</div>
				<div className="text-center text-2xl font-bold mb-2">
					Top 10 Personal Leaderboard
				</div>
				<div className="relative overflow-x-auto sm:rounded-lg">
					<table className="w-1/2 text-sm text-left text-gray-500 mx-auto dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-lightpink dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Ranking
								</th>
								<th scope="col" className="px-6 py-3">
									Game
								</th>
								<th scope="col" className="px-6 py-3">
									Score
								</th>
								<th scope="col" className="px-6 py-3">
									Time Completed (mm:ss:ms)
								</th>
								<th scope="col" className="px-6 py-3">
									Date Played
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{scores.map((score, index) => {
								return (
									<tr
										className="bg-lighterpink border-b hover:bg-lightpink dark:bg-gray-900 dark:border-gray-700"
										key={score.id}>
										<td className="px-6 py-4">{index + 1}</td>
										<td className="px-6 py-4">{score.game_id.name}</td>
										<td className="px-6 py-4">{score.score}</td>
										<td className="px-6 py-4">
											{formatTime(score.time_completed)}
										</td>
										<td className="px-6 py-4">{formatDate(score.played_on)}</td>
										<td className="px-6 py-4">
											<DeleteModal
												isDeleted={isDeleted}
												setIsDeleted={setIsDeleted}
												scoreId={score.id}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};