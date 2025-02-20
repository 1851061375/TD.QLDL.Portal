import React from "react";
import { AntdLayout } from "../../lib/antd/components";

import { Outlet } from "react-router-dom";
import PortalLayout from "@/pages/PortalLayout/components/CommonLayout/Services/layout";


export const PortalMasterLayout = () => {
  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
};