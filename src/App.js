
import "./App.css";
import AppFooter from "./component/AppFooter/index";
import AppHeader from "./component/AppHeader/index";
import PageContent from "./component/PageContent/index";
import SideMenu from "./component/SideMenu/index";
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
