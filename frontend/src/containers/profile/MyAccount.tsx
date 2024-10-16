import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getProfile } from "../../api";
import EditableAccount from "./EditableAccount";
import ProfileCard from "./ProfileCard";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { setUserProfile } from "../../state";
import { useEffect } from "react";

export default function MyAccount() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserProfile(data.data.user));
    }
  }, [data, dispatch]);

  return (
    <div className="-mt-10 w-full flex gap-6 px-8 md:flex-col-reverse sm:px-4">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <EditableAccount />
          <ProfileCard />
        </>
      )}
    </div>
  );
}
