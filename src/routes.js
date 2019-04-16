import React from 'react';
import DefaultLayout from './containers/DefaultLayout';



// core ui above just for reference
//live channels

const dramalist= React.lazy(() => import('./views/ourmedia/drama/dramalist'));



const routes = [
   
    { path: '/', name: 'dramalist', component: dramalist}
   

];

export default routes;
