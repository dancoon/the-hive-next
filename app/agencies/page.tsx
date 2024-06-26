import React from "react";
import HeroHeader from "../components/display/HeroHeader";
import { PropsWithSearchParams } from "../lib/types/base";
import { Agency } from "../lib/entities/agency";
import { BASE_URL } from "../lib/constants";
import { ListLayoutWithSideBar } from "../components/layouts";
import FilterForm from "./FilterForm";
import AgencyCard from "./AgencyCard";
import { getHeaderWithCookie } from "../lib/serverutils";
import SimilarListings from "../components/display/SimilarListings";

const AgenciesPage: React.FC<PropsWithSearchParams> = async ({
  searchParams,
}) => {
  let agencies: Agency[];
  try {
    const queryParams = new URLSearchParams(searchParams);
    const { results }: { results: any[] } = await (
      await fetch(
        new URL(`/api/proxy/agencies?${queryParams.toString()}`, BASE_URL),
        {
          cache: "no-cache",
          headers: await getHeaderWithCookie(),
        }
      )
    ).json();
    agencies = results;
  } catch (error: any) {
    // console.log(error.message);
    agencies = [];
  }
  return (
    <div>
      <HeroHeader title="All Agencies" subtitle="View our trusted agencies" />
      <ListLayoutWithSideBar
        sideBar={
          <div className="flex flex-col gap-2">
            <FilterForm />
            <SimilarListings />
          </div>
        }
      >
        <section className="text-center">
          <div className="grid gap-6 md:grid-cols-3 lg:gap-12">
            {agencies.map((agency, index) => (
              <AgencyCard key={index} agency={agency} />
            ))}
          </div>
        </section>
      </ListLayoutWithSideBar>
    </div>
  );
};

export default AgenciesPage;
