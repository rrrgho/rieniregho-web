import { useWorkingExperiences } from "@/hooks/queries/working-experience.query";
import { NavigationMenuContent } from "./ui/navigation-menu";
import { Skeleton } from "./ui/skeleton";
import { WorkingExperience } from "@/types/working-experience.types";
import { ListItem } from "./navbar";

const WorkingExperienceNavList = () => {
  const workingExperiences = useWorkingExperiences();
  const { data, isLoading, error } = workingExperiences;
  const workingExperienceData = data?.data || [];

  if (isLoading) {
    return (
      <NavigationMenuContent>
        <div className="grid gap-2 grid-cols-2 w-[400px] h-[100px]">
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
        </div>
      </NavigationMenuContent>
    );
  }

  return (
    <NavigationMenuContent className="ml-[-360]">
      <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        {workingExperienceData.map((item: WorkingExperience) => {
          return (
            <ListItem
              key={item.id}
              href={`/working-experience/${item.id}`}
              title={item.title}
              icon={item.icon}
            >
              <div className="w-full h-full pt-2">{item.subtitle}</div>
            </ListItem>
          );
        })}
      </ul>
    </NavigationMenuContent>
  );
};

export default WorkingExperienceNavList;
