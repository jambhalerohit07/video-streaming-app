import { axiosInstance } from "../../../utils/apiCalling/index";
import { useQuery } from "@tanstack/react-query";

export const getSidebarModules = async () => {
    debugger;
   const response = await axiosInstance.get("/shared/get-module");
  return response?.data?.data;
};


export const useSidebar = () => {
  return useQuery({
    queryKey: ["sidebar"],
    queryFn: getSidebarModules,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10, 
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
