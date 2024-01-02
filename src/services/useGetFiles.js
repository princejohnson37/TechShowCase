import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { GET } from "./endpoints";

const getFiles = () => {
  const response = axiosInstance.get(GET.all_files);
  console.log(response);
  return response.then((res) => res.data);
};
export const useGetFiles = () => {
  const query = useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });
  return query;
};

