import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (window.sessionStorage.getItem("itoken")) {
            // if(window.sessionStorage.getItem("itoken") === global.confirmToken){
              return (<div>
                <Component {...props} />
                <Redirect
                to={{
                  pathname: "/dieases_detection",
                  state: {
                    from: props.location[0],
                  },
                }}
              />
            </div>)
            //  }
            //  else{
            //   return (
            //     <div>
            //       <Component {...props}/>
            //     <Redirect
            //       to={{
            //         pathname: "/",
            //         state: {
            //           from: props.location[0],
            //         },
            //       }}
            //     />
            //     </div>
            //   );
            //  }
        } else {
          return (
            <div>
              <Component {...props}/>
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location[0],
                },
              }}
            />
            </div>
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
