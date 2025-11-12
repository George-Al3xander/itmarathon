import useToaster from "@hooks/useToaster.ts";
import { useFetch } from "@hooks/useFetch.ts";
import { BASE_API_URL } from "@utils/general.ts";
import type { DeleteUserButtonProps } from "./types.ts";
import IconButton from "@components/common/icon-button/IconButton.tsx";

export const DeleteUserButton = ({ userCode, id }: DeleteUserButtonProps) => {
  const { showToast } = useToaster();

  const { fetchData: deleteUser, isLoading: isDeleting } = useFetch(
    {
      url: `${BASE_API_URL}/api/users/${id}?userCode=${userCode}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      onSuccess: () => {
        window.location.reload();
      },
      onError: () => {
        showToast(
          "Failed to delete user. Please try again later.",
          "error",
          "large",
        );
      },
    },
    false,
  );

  return (
    <IconButton
      iconName="delete"
      color="green"
      onClick={() => deleteUser()}
      disabled={isDeleting}
    />
  );
};
