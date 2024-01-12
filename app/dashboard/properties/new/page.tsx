"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PropertySchema } from "@/app/lib/schema";

import clsx from "clsx";
import { lusitana } from "@/app/fonts";
import { Form, FormField } from "@/app/components/ui/form";
import {
  AmenitiesForm,
  AttributesForm,
  DetailsForm,
  FileUploadsForm,
} from "./forms";
import LocationForm from "./forms/LocationForm";
import { Button } from "@/app/components/ui/button";

type PropertyForm = z.infer<typeof PropertySchema>;
interface Props {
  property?: PropertyForm;
}
const NewProperty: React.FC<Props> = ({ property }) => {
  const form = useForm<PropertyForm>({
    resolver: zodResolver(PropertySchema),
    defaultValues: property ?? {
      amenities: [],
      attributes: [],
      date_build: undefined,
      description: undefined,
      images: [],
      location: undefined,
      published: false,
      sqftSize: undefined,
      title: "",
      types: [],
    },
  });
  function onSubmit(values: PropertyForm) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }
  return (
    <div className="p-2">
      <p
        className={clsx(
          "text-2xl pb-10 text-start self-start",
          lusitana.className
        )}
      >
        Create property
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <DetailsForm />
          <FileUploadsForm />
          <AttributesForm />
          <LocationForm />
          <AmenitiesForm />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewProperty;
