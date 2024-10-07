import { toast } from "react-toastify";

export const successAlert = (message: string) => toast.success(message);
export const warnAlert = (message: string) => toast.warn(message);
export const errorAlert = (message: string) => toast.error(message);
