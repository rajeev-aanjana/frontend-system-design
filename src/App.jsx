import "./App.css";
import Accordion from "./Components/Accordion/Accordion";
import AutocompleteSearch from "./Components/AutocompleteSearch/AutocompleteSearch";
import Carousel from "./Components/Carousel/Carousel";
import DragAndDrop from "./Components/Drag&Drop/DragAndDrop";
import FileExplorer from "./Components/FileExplorer/FileExplorer";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import InfiniteScrollByEvent from "./Components/InfiniteScrollByEvent";
import InfiniteScrollByIntersection from "./Components/InfiniteScrollByIntersection";
import InputChips from "./Components/InputChips/InputChips";
import NestedCheckbox from "./Components/NestedCheckbox/NestedCheckbox";
import OtpInput from "./Components/OTP_Input/OtpInput";
import Pagination from "./Components/Pagination/Pagination";
import Products from "./Components/Pagination/Products";
import PasswordGenerator from "./Components/PasswordGenerator";
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import Test from "./Components/Test/Test";
import Todo from "./Components/Todo/Todo";
import {createBrowserRouter, Outlet} from 'react-router-dom'

function App() {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
    </>
  );
}

export const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:"/",
        element: <Home />
      },
    {
      path: "/accordion",
      element: <Accordion />
    },
    {
      path: "/password-generator",
      element: <PasswordGenerator />
    },
    {
      path: "/todo",
      element: <Todo />
    },
    {
      path: "/pagination",
      element: <Pagination />
    },
    {
      path: "/carousel",
      element: <Carousel />
    },
    {
      path: "/autocomplete-search",
      element: <AutocompleteSearch />
    },
    {
      path: "/infinite-scroll",
      element : <InfiniteScrollByIntersection />
    },
    {
      path: "/drag&drop",
      element : <DragAndDrop />
    },
    {
      path: "/otp-input",
      element : <OtpInput />
    },
    {
      path: "/file-explorer",
      element : <FileExplorer />
    },
    {
      path: "/progress-bar",
      element : <ProgressBar />
    },
    {
      path: "/nested-checkbox",
      element : <NestedCheckbox />
    },
    {
      path: "/input-chips",
      element : <InputChips />
    },
    {
      path: "/practice",
      element : <Test />
    },
    ]
  },
]);


export default App;
