import React from "react";


const Footer = () => (
  <div className="footer-wrapper">
    <footer className="footer bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-uppercase">Content</h5>
            <p>React intern.</p>
          </div>
          <div className="col-md-3">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-light">Link 1</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-light">Link 1</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
