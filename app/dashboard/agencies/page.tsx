import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { PropsWithSearchParams } from "@/app/lib/types/base";
import TableSkeleton from "../properties/components/TableSkeleton";
import AgencyDataTable from "./table/AgencyDataTable";

const AgentListing: React.FC<PropsWithSearchParams> = ({ searchParams }) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex-1">
          <CardTitle>Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            key={"searchResults"}
            fallback={<TableSkeleton cols={4} rows={7} />}
          >
            <AgencyDataTable searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentListing;
