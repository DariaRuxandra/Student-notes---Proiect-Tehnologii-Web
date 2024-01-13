import Edit from "./views/Edit";
import LogIn from "./views/LogIn";
import MyWork from "./views/MyWork";
import NotFound from "./views/NotFound";
import SignIn from "./views/SignIn";
import Update from "./views/Update";
import ViewFile from "./views/ViewFile";

export const routes = Object.freeze([
  { 
    path: '/', 
    component: LogIn,
    name: null,
    // private: false, // Indicate whether the route is private (requires login)
  },
  {
    path: '/SignIn', 
    component: SignIn,
    name: null
  },
  { 
    path: '/Edit', 
    component: Edit,
    name: "Edit",
    // private: true,
  },
  { 
    path: '/Update', 
    component: Update,
    name: null,
    // private: true,
  },
  { 
    path: '/MyWork', 
    component: MyWork,
    name: "My Work",
    // private: true,
  },
  { 
    path: '/ViewFile', 
    component: ViewFile,
    name: null
  },
  { 
    path: '/ViewFile/:id', 
    component: ViewFile,
    name: null
  },
  { 
    path: '*', 
    component: NotFound,
    name: null,
    // private: false,
  }
]);
