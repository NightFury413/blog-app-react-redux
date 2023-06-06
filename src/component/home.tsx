import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addBlog, updateBlog } from "../actions/blog";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
library.add(faS, faEye, faThumbsUp);

interface Props {
  addBlog: (blog: {}) => void;
  updateBlog: (blog: []) => void;
}

const ListBlogs: React.FC<Props> = ({ addBlog, updateBlog }) => {
  const blogs = useSelector((state: any) => state.blogs);
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [currentUserName, setCurrentUserName] = useState();
  // const blogs = JSON.parse(localStorage.getItem("blogs") || "{}");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const addNewBlog = () => {
    const { title, text, imageUrl } = values;
    if (!title || !text || !imageUrl) return;
    const newBlog = {
      title: title,
      text: text,
      href: "/detailView",
      imageUrl: imageUrl,
      created_at: Date(),
      creatorName: currentUserName,
      creator: currentUser,
      watches: 0,
      likes: 0,
      likes_users: [currentUser],
    };

    addBlog(newBlog);
    // localStorage.setItem("blogs", JSON.stringify([...blogs, newPost]));
    setShowModal(false);
  };
  const handleBlogClick = (index: number) => {
    ///
    if (String(currentUser) !== String(blogs[index].creator)) {
      blogs[index].watches++;
      updateBlog(blogs);
    }
    navigate("/detailView/" + index);
  };
  useEffect(() => {
    // localStorage.removeItem("blogs");
    console.log(blogs);
    users.map((user: any) => {
      if (String(user.email) === String(currentUser)) {
        setCurrentUserName(user.full_name);
        return;
      }
    });
    if (typeof currentUser === typeof {}) navigate("/");
  }, []);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/home"
            >
              Blog site
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
                  className="px-3 py-2 text-green-500 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
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
      <button
        className="bg-pink-500 mt-10 text-white active:bg-pink-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add New Blog
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create new Blog</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <div className="col-span-2 py-4">
                    <div className=" relative ">
                      <input
                        type="text"
                        name="title"
                        id="contact-form-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-pink-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600  focus:border-transparent"
                        placeholder="Title"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 py-2">
                    <label className="text-gray-700" htmlFor="name">
                      <textarea
                        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-pink-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        id="text"
                        placeholder="Type your blog text here"
                        name="text"
                        rows={5}
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
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-pink-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Type URL of your image"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

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
                    onClick={() => addNewBlog()}
                  >
                    Add Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className=" py-5 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.length > 0 &&
              blogs.map((blog: any, index: any) => {
                // if (index === 0) return;
                return (
                  <div className="hover:shadow-lg outline-none cursor-pointer" onClick={() => handleBlogClick(index)}>
                    <article
                      key={index}
                      className="flex max-w-xl flex-col items-start justify-between w-full"
                    >
                      <div className="flex items-center gap-x-4 text-xs w-">
                        <time
                          dateTime={blog.created_at}
                          className="text-gray-500"
                        >
                          {blog.created_at}
                        </time>
                      </div>
                      <div className="group relative w-full ">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <div>
                            <span className="absolute inset-0" />
                            {blog.title}
                          </div>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {blog.text}
                        </p>
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4 ">
                        <img
                          src={blog.imageUrl}
                          alt="NoImage"
                          className="h-30 w-30 rounded-full bg-gray-50"
                        />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <FontAwesomeIcon icon={["fas", "eye"]} bounce />{" "}
                            {blog.watches}
                          </p>
                          <p className="text-gray-600">
                            <FontAwesomeIcon
                              icon={["fas", "thumbs-up"]}
                              beat
                              style={{ color: "#ce2222" }}
                            />{" "}
                            {blog.likes}
                          </p>
                          <p className="text-gray-600">{blog.creatorName}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(() => {}, { addBlog, updateBlog })(ListBlogs);
