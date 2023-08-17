import BreadcrumbComponent from "./Breadcrumb";
import ClassOptions from "./ClassOptions";
import VideoClassScreen from "./VideoClassScreen";
import "./TakeaClassPage.css"
import FreshNavbar from "./Freshnavbar";
import "./Freshnavbar.css"
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

const TakeaClassPage = () => {
  return (
    <>
      <div className="takelesson__div">
        <QueryClientProvider client={queryClient} >
          <FreshNavbar />
        </QueryClientProvider>

        <div className="MainContainer">
          <div className="take-a-class-page">
            <BreadcrumbComponent />
            <div className="BottomPart">
              <ClassOptions />
              <VideoClassScreen />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default TakeaClassPage;