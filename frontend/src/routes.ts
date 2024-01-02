import Edit from "./views/Edit";
import LogIn from "./views/LogIn";
import MyWork from "./views/MyWork";
import NotFound from "./views/NotFound";

export const routes = Object.freeze([
  { 
    path: '/', 
    component: LogIn,
    name: null,
    // private: false, // Indicate whether the route is private (requires login)
  },
  { 
    path: '/Edit', 
    component: Edit,
    name: "Edit",
    // private: true,
  },
  { 
    path: '/MyWork', 
    component: MyWork,
    name: "My Work",
    // private: true,
  },
  { 
    path: '*', 
    component: NotFound,
    name: null,
    // private: false,
  }
]);
