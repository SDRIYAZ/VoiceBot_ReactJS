import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./reducers/homepage/header";
import bannerSlice from "./reducers/homepage/banner";
import ourprojectsSlice from "./reducers/homepage/ourprojects";

const HomePageStore = configureStore({
  reducer: {
    homepage_header: headerSlice.reducer,
    homepage_banner: bannerSlice.reducer,
    homepage_ourprojects : ourprojectsSlice.reducer,
  },
});
export default HomePageStore;