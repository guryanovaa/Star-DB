import React from 'react';

import './spiner.css';

const Spiner = () => {
    return (
        <div class="lds-css ng-scope">
          <div class="lds-double-ring">
             <div></div>
             <div></div>
          </div>
        </div>  
    );
};

export default Spiner;