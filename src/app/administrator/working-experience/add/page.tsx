"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WorkingExperienceForm, {
  workingExperienceFormSchema,
} from "@/components/working-experience-form";
import { useMutateWorkingExperience } from "@/hooks/queries/working-experience.query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

export default function WorkingExperienceAddPage() {
  const router = useRouter();
  const workingExperienceStore = useMutateWorkingExperience();
  const { mutate, isPending } = workingExperienceStore;
  const onSubmit = async (
    data: z.infer<typeof workingExperienceFormSchema>
  ) => {
    try {
      await mutate(data, {
        onSuccess: () => {
          toast.success("Project created successfully!");
          router.push("/administrator/working-experience");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Add new working experience</CardTitle>
          <CardDescription>
            Working experience list will be shown first as Navbar on the website
          </CardDescription>
          <CardContent>
            <WorkingExperienceForm onSubmit={onSubmit} isPending={isPending} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
