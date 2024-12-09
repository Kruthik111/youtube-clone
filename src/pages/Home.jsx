import { HiOutlineDotsVertical } from "react-icons/hi";
import useFetch from "../utils/useFetch";
import ErrorPage from "./ErrorPage";
import ResultLoading from "../components/ResultLoading";
import { Link } from "react-router-dom";

const VideoCards = ({ e }) => {
  return (
    <Link
      to={`/Video/${e.id.videoId}`}
      className="flex-1  h-full overflow-hidden min-w-72 max-w-96  md:min-w-80 bg-inherit pb-3"
      key={e.id.videoId}
    >
      <div className=" rounded-lg max-h-56 md:max-h-60 -mt-9 overflow-hidden select-none bg-black">
        <img
          // src="https://static-cse.canva.com/blob/1684710/1600w-wK95f3XNRaM.jpg"
          src={e.snippet.thumbnails.high.url}
          draggable="false"
          className="object-cover select-none m-auto"
          alt=""
        />
      </div>
      <div className="flex gap-1 justify-between text-black bg-inherit  border-solid px-1 pt-1 h-2/6  ">
        <div className="text-sm  dark:text-gray-300 h-1/4">
          <h1 className="text-base line-clamp-2 font-bold text-black dark:text-white tracking-tighter ">
            {e.snippet.title}
          </h1>
          <h1 className="text-ellipsis  line-clamp-1 w-36 ">
            {e.snippet.channelTitle}
          </h1>
          <span className="flex gap-2">
            {/* {console.log(e)} */}
            <h1>10k views</h1>
            <h1>34 minutes ago</h1>
          </span>
        </div>
        <div className="pt-2 right-1">
          <HiOutlineDotsVertical size={18} />
        </div>
      </div>
    </Link>
  );
};

const Home = (props) => {
  document.title = "YouTube";
  var q = "youtube india";
  const { data, error, pending } = useFetch(
    `search?part=snippet&statistics&type=video&maxResults=24&q=${q}&key=${process.env.REACT_APP_YOUTUBE_APIKEY}`,
    {}
  );

  if (pending) {
    // if (true) {
    return (
      <div className="w-screen h-[500vh]  bg-black mt-20">
        <ResultLoading />
      </div>
    );
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex flex-wrap justify-around sm:gap-2 pt-16 w-screen h-full scroll-smooth overflow-y-hidden min-h-screen dark:bg-black px-3">
        {data && data.map((e) => <VideoCards e={e} />)}
      </div>
    </>
  );
};
export default Home;
