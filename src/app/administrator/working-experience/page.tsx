"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getWorkingExperienceColumns,
  useDeleteWorkingExperience,
} from "@/hooks/queries/working-experience.query";
import DeleteActionCell from "@/components/delete-action-cell";
import AppDatatable from "@/lib/Datatable/datatable";
import { WorkingExperience } from "@/types/working-experience.types";
import { Plus, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

export default function WorkingExperiencePage() {
  const router = useRouter();
  const deleteWorkingExperienceMutation = useDeleteWorkingExperience();
  const { mutate: deleteWorkingExperience } = deleteWorkingExperienceMutation;

  const handleViewExperience = (workingExperience: WorkingExperience) => {
    router.push(`/administrator/working-experience/${workingExperience.id}`);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      return new Promise<void>((resolve, reject) => {
        deleteWorkingExperience(id, {
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });
    },
    [deleteWorkingExperience]
  );

  const columns: ColumnDef<WorkingExperience>[] = useMemo(() => {
    const baseColumns = getWorkingExperienceColumns();
    return [
      ...baseColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleViewExperience(row.original);
              }}
              className="text-blue-500 cursor-pointer hover:text-blue-700 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <DeleteActionCell
              id={row.original.id || ""}
              onDelete={handleDelete}
              title="Delete Working Experience"
              description="Are you sure you want to delete this working experience? This action cannot be undone."
            />
          </div>
        ),
      },
    ];
  }, [handleDelete]);

  return (
    <div className="w-full">
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Working Experience</CardTitle>
            <CardDescription>
              List your work experience to the Website !
            </CardDescription>
            <CardAction>
              <Link href="/administrator/working-experience/add">
                <Button variant="outline" className="cursor-pointer">
                  <Plus />
                  Add Working Experience
                </Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <AppDatatable endpoint="/working-experiences" columns={columns} />
          </CardContent>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
