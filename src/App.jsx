import "./App.css";
import Accordion from "./Components/Accordion/Accordion";
import AutocompleteSearch from "./Components/AutocompleteSearch/AutocompleteSearch";
import Carousel from "./Components/Carousel/Carousel";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import InfiniteScrollByEvent from "./Components/InfiniteScrollByEvent";
import InfiniteScrollByIntersection from "./Components/InfiniteScrollByIntersection";
import Pagination from "./Components/Pagination/Pagination";
import Products from "./Components/Pagination/Products";
import PasswordGenerator from "./Components/PasswordGenerator";
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
      path: "/practice",
      element : <Test />
    },
    ]
  },
]);


export default App;
