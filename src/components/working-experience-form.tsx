"use client";

import { WorkingExperience } from "@/types/working-experience.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, MessageCircleWarningIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { DatePicker } from "./date-picker";
import InputImage from "./input-image";
import QuillEditor from "./quill-editor";
import { Button } from "./ui/button";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useCallback, useEffect, useState } from "react";

export const workingExperienceFormSchema = z.object({
  title: z.string({ message: "Cannot be empty" }),
  subtitle: z.string({ message: "Cannot be empty" }),
  location: z.string({ message: "Cannot be empty" }),
  description: z.string({ message: "Cannot be empty" }),
  start_date: z.date({ message: "Cannot be empty" }),
  end_date: z.date().optional(),
  company_logo: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 1.5 * 1024 * 1024, "Max size 1.5MB"),
    z.string(),
  ]),
  banner: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 1.5 * 1024 * 1024, "Max size 1.5MB"),
    z.string(),
  ]),
  icon: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 0.5 * 1024 * 1024, "Max size 500kb"),
    z.string(),
  ]),
});

type WorkingExperienceFormProps = {
  onSubmit: (data: z.infer<typeof workingExperienceFormSchema>) => void;
  isPending?: boolean;
  data?: WorkingExperience;
  isDetail?: boolean;
};

export default function WorkingExperienceForm({
  onSubmit,
  isPending,
  data,
  isDetail,
}: WorkingExperienceFormProps) {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [showButtonSubmit, setShowButtonSubmit] = useState(true);
  const form = useForm<z.infer<typeof workingExperienceFormSchema>>({
    resolver: zodResolver(workingExperienceFormSchema),
  });

  const populateForm = useCallback(
    (data: WorkingExperience) => {
      const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
      form.setValue("title", data.title || "");
      form.setValue("subtitle", data.subtitle || "");
      form.setValue("description", data.description || "");
      form.setValue("location", data.location || "");
      form.setValue("start_date", new Date(data.start_date || new Date()));
      if (data.end_date) {
        form.setValue("end_date", new Date(data.end_date || new Date()));
      }
      form.setValue("icon", storageUrl + data.icon);
      form.setValue("company_logo", storageUrl + data.company_logo);
      form.setValue("banner", storageUrl + data.banner);
    },
    [form]
  );

  useEffect(() => {
    if (data) {
      populateForm(data);
    }
  }, [data]);

  useEffect(() => {
    if (isDetail) {
      if (onEdit) {
        setShowButtonSubmit(true);
      } else {
        setShowButtonSubmit(false);
      }
    }
  }, [onEdit]);

  return (
    <div>
      {isDetail && (
        <div className="w-full flex justify-end items-end">
          <Button
            onClick={() => {
              setOnEdit(true);
            }}
            disabled={onEdit}
            className="bg-transparent cursor-pointer hover:bg-transparent group"
          >
            <Edit className="edit-icon size-6 group-hover:opacity-50 transition-opacity" />
          </Button>
        </div>
      )}
      <form id="working-experience-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-no-wrap justify-center gap-6">
          {/* Non Image Input */}
          <div className="w-[50%]">
            <div className="w-full grid grid-cols-1 gap-6">
              <div>
                <Controller
                  name="icon"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="flex flex-col w-[200px] gap-2"
                      >
                        <FieldLabel className="text-md">Icon</FieldLabel>

                        <InputImage
                          id="company_icon"
                          height="200"
                          field={field}
                          disabled={isDetail && !onEdit}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title_input">Title</FieldLabel>
                      <Input
                        {...field}
                        id="title_input"
                        aria-invalid={fieldState.invalid}
                        placeholder="Something like company name, organization or etc."
                        autoComplete="off"
                        disabled={isDetail && !onEdit}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="subtitle"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="subtitle_input">Subtitle</FieldLabel>
                      <Input
                        {...field}
                        id="subtitle_input"
                        aria-invalid={fieldState.invalid}
                        placeholder="A short bio we will show in relevant place"
                        autoComplete="off"
                        disabled={isDetail && !onEdit}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="location_input">Location</FieldLabel>
                      <Input
                        {...field}
                        id="location_input"
                        aria-invalid={fieldState.invalid}
                        placeholder="A short bio we will show in relevant place"
                        autoComplete="off"
                        disabled={isDetail && !onEdit}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="working_experience_description">
                        Tell your story, like what you have done !
                      </FieldLabel>
                      <QuillEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        disabled={isDetail && !onEdit}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Controller
                    name="start_date"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="start_date_input">
                          Start Date
                        </FieldLabel>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isDetail && !onEdit}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="end_date"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="end_date_input">
                          End Date
                        </FieldLabel>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isDetail && !onEdit}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%] grid gap-6">
            <div>
              <Controller
                name="banner"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="flex flex-col gap-2"
                    >
                      <FieldLabel className="text-md">Banner</FieldLabel>
                      <div className="mt-[-5] flex flex-nowrap items-center">
                        <MessageCircleWarningIcon className="size-4 mr-1 text-primary" />
                        <span className="text-xs text-primary/70">
                          We will show this image as main image of the working
                          experience, like the large one.
                        </span>
                      </div>

                      <InputImage
                        id="banner"
                        field={field}
                        disabled={isDetail && !onEdit}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name="company_logo"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="flex flex-col gap-2"
                    >
                      <FieldLabel className="text-md">Company Logo</FieldLabel>

                      <InputImage
                        id="company_logo"
                        field={field}
                        disabled={isDetail && !onEdit}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          {showButtonSubmit && (
            <Field orientation="horizontal" className="flex justify-end">
              <Button
                className="cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => {
                  if (onEdit) {
                    setOnEdit(false);
                  } else {
                    form.reset();
                  }
                }}
              >
                {onEdit ? "Cancel" : "Reset"}
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                form="working-experience-form"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </Field>
          )}
        </div>
      </form>
    </div>
  );
}
