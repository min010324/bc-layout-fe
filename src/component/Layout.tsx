// import Sidebar from './Sidebar';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import styles from '../assets/style/layout.module.css';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";

interface ILayout {
  title: string;
  footermessage: string;
  menuList: ISidebar[];
}

interface ISidebar {
  menuList: any;
  toGo: string;
}

const Layout = ({title, footermessage, menuList}: ILayout) => {
  const location = useLocation();
  return (
      <>
        <Header title={title}/>
        <div className={styles.page}>
          {location.pathname !== "/" && <Sidebar menuList={menuList}/>}
          <div className={styles.outlet}>
            <Outlet/>
          </div>
        </div>
        {/*<Footer message={footermessage}/>*/}
      </>
  );
}

const Header = ({title}) => {
  return (
      <header>
        <img className={styles["header-icon"]} src="image/build_center_icon.png" alt="buildcenter_icon"/>
        <h2>{title}</h2>
      </header>
  );
}

const Sidebar = ({menuList}: ISidebar[]) => {
  const nagivate = useNavigate();
  const handleOnClick = (togo: string) => {
    nagivate(togo);
  }

  return (
      <div className={styles["side-bar"]}>
        {/*{menuList.map((menu, index) => (*/}
        {/*    <div className={styles.item} key={index} onClick={() =>handleOnClick(menu.toGo)}>*/}
        {/*      <p>{menu.name}</p>*/}
        {/*    </div>*/}
        {/*))}*/}
        <List sx={{width: "100%", bgcolor: 'background.paper'}}>
          {menuList.map((menu, index) => (
              <ListItem disablePadding onClick={() => handleOnClick(menu.toGo)} key={index}>
                <ListItemButton>
                  {/*<ListItemIcon>*/}
                  {/*  <StarIcon />*/}
                  {/*</ListItemIcon>*/}
                  <ListItemText primary={menu.name}/>
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </div>
  );
}
// const Footer = ({message}) => {
//   return (
//       <footer>
//         <span>{message}</span>
//       </footer>
//   );
// }


export default Layout;
