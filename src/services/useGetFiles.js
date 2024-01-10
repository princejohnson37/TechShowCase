import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { GET } from "./endpoints";

const getFiles = () => {
  return axiosInstance.get(GET.all_projects);
};
export const useGetFiles = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: getFiles,
  });
  return query;
};

