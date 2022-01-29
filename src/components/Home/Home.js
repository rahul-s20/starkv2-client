import React from 'react';
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div>
             <div className="jumbotron text-center">
          <h1 className="display-3">Welcome to Rahul's Arena!</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classNamees for typography and spacing to space
            content out within the larger container.
          </p>
          <p className="lead">
            <div>
              <Link
                className="btn btn-primary btn-lg"
                role="button" to="/signup"
              >
                Sign up
              </Link>

              <Link
                className="btn btn-success btn-lg"
                role="button" to="/signin"
                style={{ marginLeft: 10 }}
              >
                Sign in
              </Link>
            </div>
          </p>
        </div>
        <hr/>
       
      </div>
    )
}
