import Root from "./routes/Root";
import Anotherpage from "./routes/Anotherpage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SelectedCinema from "./routes/SelectedCinema";
import PageNotFound from "./routes/PageNotFound";
import SearchResult from "./routes/SearchResult";
import Tvshow from "./routes/Tvshow";
import Movies from "./routes/Movies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./utils/api";
import { getApiConfigurations } from "./store/rootSlice";
import Watchlist from "./routes/Watchlist";
import RootLayout from "./layouts/RootLayout";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConfiguration();
  });

  const fetchConfiguration = () => {
    fetchData("/configuration").then((res) => {
   
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfigurations(url));
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Root />} />
        <Route path=":mediaType/:id" element={<SelectedCinema />} />
        <Route path="search/:query" element={<SearchResult />} />
        <Route path="anotherpage" element={<Anotherpage />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="tvshow" element={<Tvshow />} />
        <Route path="movies" element={<Movies />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
