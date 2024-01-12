import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/axiosInstance";
import { GET } from "../../../services/endpoints";

const getAPI = () => axiosInstance.get(GET.current_user);

const useUser = () => {
  return useQuery({
    queryKey: ["CURRENT-USER"],
    queryFn: getAPI
  });
};
export default useUser;