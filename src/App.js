import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter/appFooter";
import AppHeader from "./Components/AppHeader/appheader";
import PageContent from "./Components/PageContent/pageContent";
import SideMenu from "./Components/SideMenu/sideMenu";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}
export default App;
