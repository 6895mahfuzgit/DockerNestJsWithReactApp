import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Paginator = (props:{page:number,totalRecords :number,lastpage :number,pageChange:(page:number)=>void}) => {

    

    const next = () => {
        if (props.page < props.lastpage) {
           // setPage(page + 1)
           props.pageChange(props.page +1);
        }

    }


    const preview = () => {
        if (props.page > 1) {
           // setPage(page - 1)
           props.pageChange(props.page - 1);
        }

    }

    return ( 
    <nav>
        Total Record  <b>{props.totalRecords}</b>
         <ul className="pagination justify-content-end">
          {
         props.page > 1 &&
         <li className="page-item">
             <a className="page-link" href="#" onClick={preview}>Previous</a>
         </li>
     }

     {
         props.page < props.lastpage &&
         <li className="page-item">
             <a className="page-link" href="#" onClick={next}>Next</a>
         </li>
     }
 </ul>
 <div>
 Page <b> {props.page}</b> of <b>{ props.lastpage}</b>
 </div>
</nav>
)
};

export default Paginator;