/**
 * Defining project columns for datatable.
 * These columns will be used in the datatable component to display project data.
 */

import apiClient from "@/lib/api-client";
import { formatDateToAPI } from "@/lib/utils";
import { IAPIResponse } from "@/types/global.type";
import { WorkingExperience } from "@/types/working-experience.types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

const endpoint = "/working-experiences";

export const workingExperienceColumns: ColumnDef<WorkingExperience>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "subtitle",
    header: "Subtitle",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const value = row.getValue<string>("project_date");
      return moment(value).format("MMMM YYYY");
    },
  },
];

/**
 * Get Working Experience Columns with Actions
 * Returns base columns without actions - actions are added at page level
 */
export function getWorkingExperienceColumns(): ColumnDef<WorkingExperience>[] {
  return workingExperienceColumns;
}

/**
 * Get Working Experiences
 * This function bellow is used to get all working experiences
 */

async function fetchWorkingExperiences(
  params?: Record<string, any>
): Promise<IAPIResponse<WorkingExperience>> {
  const response = await apiClient.get(endpoint, { params });
  return response.data;
}

export function useWorkingExperiences(
  params?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<IAPIResponse<WorkingExperience>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["/working-experiences"],
    queryFn: () => fetchWorkingExperiences(params),
    ...options,
  });
}

/**
 * Get Working Experience Detail
 * This function bellow is used to get Single working experience
 * @param id
 */

async function fetchSingleWorkingExperience(
  id: string
): Promise<IAPIResponse<WorkingExperience>> {
  const response = await apiClient.get(endpoint + `/${id}`);
  return response.data;
}

export function useWorkingExperienceDetail(
  id: string,
  options?: Omit<
    UseQueryOptions<IAPIResponse<WorkingExperience>>,
    "queryKey" | "queryFN"
  >
) {
  return useQuery<IAPIResponse<WorkingExperience>>({
    queryKey: ["/working-experiences", id],
    queryFn: () => fetchSingleWorkingExperience(id),
    ...options,
  });
}

/**
 * Store Working Experience
 * This function belongs to mutate working experience data, like create and update
 * @param data
 * @returns
 */

async function mutateWorkingExperience(
  data: WorkingExperience,
  id?: string
): Promise<IAPIResponse<WorkingExperience>> {
  const formattedData = { ...data };

  // Format dates
  if (formattedData.start_date) {
    formattedData.start_date = formatDateToAPI(
      formattedData.start_date as any
    ) as any;
  }
  if (formattedData.end_date) {
    formattedData.end_date = formatDateToAPI(
      formattedData.end_date as any
    ) as any;
  }

  // Check if any image field exists and needs to be uploaded
  const imageFields = ["company_logo", "icon", "banner"];
  const hasImageFiles = imageFields.some(
    (field) =>
      (formattedData[field as keyof WorkingExperience] as any) instanceof File
  );

  if (hasImageFiles) {
    const formData = new FormData();

    // Append all fields except image fields to formData
    Object.keys(formattedData).forEach((key) => {
      if (!imageFields.includes(key)) {
        const value = formattedData[key as keyof typeof formattedData];
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    });

    // Append image files if they are File instances
    imageFields.forEach((field) => {
      const value = formattedData[field as keyof WorkingExperience] as any;
      if (value instanceof File) {
        formData.append(field, value);
      }
    });

    const response = await apiClient.post<IAPIResponse<WorkingExperience>>(
      endpoint + (id ? `/${id}` : ""),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } else {
    const { icon, company_logo, banner, ...dataWithoutImage } = formattedData;
    // No files, send as JSON
    const response = await apiClient.post<IAPIResponse<WorkingExperience>>(
      endpoint + (id ? `/${id}` : ""),
      dataWithoutImage
    );
    return response.data;
  }
}

export function useMutateWorkingExperience(id?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkingExperience) => mutateWorkingExperience(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/working-experiences"],
        exact: false,
      });
    },
  });
}

/**
 * Delete Working Experience
 * This function deletes a working experience by its ID
 */

async function deleteWorkingExperience(
  id: string
): Promise<IAPIResponse<WorkingExperience>> {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
}

export function useDeleteWorkingExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWorkingExperience(id),
    onSuccess: () => {
      // Invalidate all working experiences queries
      queryClient.invalidateQueries({
        queryKey: ["/working-experiences"],
        exact: false,
      });
    },
  });
}
