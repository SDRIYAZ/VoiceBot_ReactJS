import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "reducers/homepage/header";
import bannerSlice from "reducers/homepage/banner";
import ourprojectsSlice from "reducers/homepage/ourprojects";
import ourparentsvoiceSlice from "reducers/homepage/parentsvoice";
import leadersvoiceSlice from "reducers/homepage/leadersvoice";
import newsletterSlice from "reducers/homepage/newsletter";
import navbarSlice from "./reducers/landingpage/navbar";
import leftmenuSlice from "./reducers/landingpage/leftmenu";
import bodySlice from "./reducers/landingpage/body";
import signUpDataSlice from "./reducers/signup/signupdata";

const HomePageStore = configureStore({
  reducer: {
    homepage_header: headerSlice.reducer,
    homepage_banner: bannerSlice.reducer,
    homepage_ourprojects: ourprojectsSlice.reducer,
    homepage_parentsvoice: ourparentsvoiceSlice.reducer,
    homepage_newsletter: newsletterSlice.reducer,
    homepage_leadersvoice: leadersvoiceSlice.reducer,
    signupdata_slice: signUpDataSlice.reducer,
    landingpage_navbar: navbarSlice.reducer,
    landingpage_leftmenu: leftmenuSlice.reducer,
    landingpage_body: bodySlice.reducer
  },
});
export default HomePageStore;