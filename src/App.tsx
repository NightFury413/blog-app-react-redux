import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Register from "./component/register";
import Header from "./component/header";
import DetailView from "./component/detailPage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from "redux";
import "./App.css";
import Home from "./component/home";
import thunk from "redux-thunk";
import { ACTIONTYPE,Blog } from "./types";
import blogReducer from "./reducer/blogReducer";

interface BlogAction {
  type: ACTIONTYPE;
  payload: Blog;
}

interface BlogsState {
  blogs: Blog[];
}

const store: Store<BlogsState, BlogAction> & {
  dispatch: any;  
} = createStore(blogReducer, applyMiddleware(thunk));

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detailView/:id" element={<DetailView />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
