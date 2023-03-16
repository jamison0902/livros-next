import React from 'react';
import Navbar from './Nav';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout(props: any) {
    return (
        <div>
            <Navbar />
            {
                props.children
            }
        </div>
    )
}