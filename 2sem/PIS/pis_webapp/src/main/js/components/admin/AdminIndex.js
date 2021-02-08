import React from "react";
import Sidebar from './Sidebar';
import AdminSectionHeader from "./partial/AdminSectionHeader";

function AdminIndex() {
    return(
        <div id="admin-index" className="admin">
            <Sidebar activeItem={-1} />
            <div className="admin-content">
                <AdminSectionHeader pageTitle="Dashboard" create={false}/>
            </div>
        </div>
    );
}

export default AdminIndex;