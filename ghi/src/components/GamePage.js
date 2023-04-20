import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../store/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/authApi";
import { Link } from "react-router-dom";

const GamePage = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [logout, result] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return token ? (
    <>
      <div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://www.icomedia.eu/wp-content/uploads/2017/06/Its-Quiz-Time-Logo.png"
                alt=""
              ></img>
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                  Quiz Game
                </h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                Challenging trivia game, try to get the best score and time out
                of 10 questions.
              </p>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => navigate("/games/quiz")}
              >
                Play!
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </>
  ) : (
    <>
      <div>you are not logged in</div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => navigate("/login")}
      >
        Go to login page
      </button>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => navigate("/signup")}
      >
        Go to signup page
      </button>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => navigate("/games/quiz")}
      >
        Go to quiz game
      </button>
    </>
  );
};

export default GamePage;
