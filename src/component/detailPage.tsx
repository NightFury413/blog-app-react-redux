import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@material-tailwind/react";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { updateBlog } from "../actions/blog";

library.add(faS, faEye, faThumbsUp);

interface Props {
  updateBlog: (blog: []) => void;
}

const DetailView: React.FC<Props> = ({ updateBlog }) => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  const blogs = useSelector((state: any) => state.blogs);
  const updatedBlogs = JSON.parse(JSON.stringify(blogs));

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [currentUserName, setcurrentUserName] = useState();

  const { id } = useParams();
  const [currentBlog, setCurrentBlog] = useState(blogs[Number(id)]);
  const [showModal, setShowModal] = useState(false);

  const [values, setValues] = useState({
    title: currentBlog.title,
    text: currentBlog.text,
    imageUrl: currentBlog.imageUrl,
  });

  useEffect(() => {
    setCurrentBlog(blogs[Number(id)]);
    // console.log(currentBlog);
  }, [blogs]);

  const handleLikes = () => {
    let countFan = 0;

    // console.log(updatedBlogs[Number(id)].like_users);
    updatedBlogs[Number(id)].likes_users.map((fan: any) => {
      if (currentUser === fan) return;
      countFan++;
    });
    if (countFan === updatedBlogs[Number(id)].likes_users.length) {
      if (window.confirm("Do you like this blog?")) {
        updatedBlogs[Number(id)].likes++;
        updatedBlogs[Number(id)].likes_users.push(currentUser);
        updateBlog(updatedBlogs);
      }
    }
    // console.log(blogs[Number(id)].likes_users);
  };
  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const updateMyBlog = () => {
    const { title, text, imageUrl } = values;
    if (!title || !text || !imageUrl) return;
    console.log(currentBlog);
    const newBlog = {
      title: title,
      text: text,
      href: "/detailView",
      imageUrl: imageUrl,
      created_at:
        moment(new Date()).format("DD-MM-YYYY") +
        "  " +
        moment(new Date()).format("hh:mm:ss a"),
      creatorName: currentUserName,
      creator: currentUser,
      watches: currentBlog.watches,
      likes: currentBlog.likes,
      likes_users: currentBlog.likes_users,
    };
    // newBlog.likes_users.push();
    console.log("newBlog: ", newBlog);
    updatedBlogs[Number(id)] = newBlog;
    updateBlog(updatedBlogs);
    setShowModal(false);
  };
  useEffect(() => {
    users.map((user: any) => {
      if (String(user.email) === String(currentUser)) {
        setcurrentUserName(user.full_name);
        return;
      }
    });
    // console.log(currentUser);
    if (typeof currentUser === typeof {}) navigate("/");
  }, []);

  const handleModalBtn = () => {
    if (currentBlog.creator === currentUser) setShowModal(true);
    else alert("Can not edit because you are not a creator of this blog.");
  };
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/home"
            >
              Back
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
            >
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 text-green-500 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/home"
                >
                  Current User : {currentUserName}
                </a>
              </li>
              <li className="nav-item">
                <div
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                  }}
                >
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/"
                  >
                    Log out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className=" py-5 sm:py-8">
        <div className=" h-screen flex items-center justify-center">
          <div className="flex flex-col  gap-6">
            {blogs.map((blog: any, index: any) => {
              if (String(index) !== id) return;
              return (
                <>
                  <button
                    className="bg-pink-500 text-white active:bg-pink-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModalBtn}
                  >
                    Edit this Blog
                  </button>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-full my-6 mx-auto max-w-6xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                Edit My Blog
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto ">
                              <div className="col-span-2 py-4">
                                <div className=" relative ">
                                  <input
                                    type="text"
                                    name="title"
                                    id="contact-form-name"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-pink-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm  focus:outline-none focus:ring-2 focus:ring-purple-600  focus:border-transparent h-16 text-2xl"
                                    placeholder="Title"
                                    value={values.title}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-span-2 py-2">
                                <label className="text-gray-700" htmlFor="name">
                                  <textarea
                                    className="flex-1 w-full px-4 py-2 text-xl text-gray-700 placeholder-gray-400 bg-white border border-pink-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    id="text"
                                    placeholder="Type your blog text here"
                                    name="text"
                                    value={values.text}
                                    rows={10}
                                    cols={40}
                                    onChange={handleChange}
                                  ></textarea>
                                </label>
                              </div>
                              <div className="col-span-2 py-4 ">
                                <div className=" relative ">
                                  <input
                                    type="text"
                                    name="imageUrl"
                                    id="contact-form-name"
                                    value={values.imageUrl}
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-pink-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Type URL of your image"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => updateMyBlog()}
                              >
                                Save Blog
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                  <input
                    value={blog.title}
                    className="text-6xl text-center h-50"
                  />
                  <div className="relative mt-8 flex items-center gap-x-4 h-40">
                    <img
                      src={blog.imageUrl}
                      alt="blogImage"
                      className="h-60 w-full   bg-gray-50"
                    />
                  </div>
                  <Textarea
                    value={blog.text}
                    className="text-xl mt-10 text-justify"
                    rows={8}
                  />

                  <div className="mt-10">
                    <div className="text-sm leading-6 w-full flex items-center justify-between ">
                      <div>
                        <button onClick={handleLikes}>
                          <FontAwesomeIcon
                            icon={["fas", "thumbs-up"]}
                            beat
                            style={{ color: "#d624c7" }}
                            size="2xl"
                          />{" "}
                        </button>
                      </div>
                      <div className="font-semibold text-gray-900 ">
                        <FontAwesomeIcon icon={["fas", "eye"]} bounce />{" "}
                        {blog.watches}{" "}
                        <FontAwesomeIcon
                          icon={["fas", "thumbs-up"]}
                          beat
                          style={{ color: "#ce2222" }}
                        />{" "}
                        {blog.likes}{" "}
                        <time
                          dateTime={blog.created_at}
                          className="text-gray-500"
                        >
                          {blog.created_at}
                        </time>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(() => {}, { updateBlog })(DetailView);
