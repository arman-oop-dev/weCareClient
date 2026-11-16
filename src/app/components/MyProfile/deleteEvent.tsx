"use client";

import { authClient } from "@/app/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

type DeleteEventProps = {
  itemTitle: string;
  itemID: string;
  onLeft?: () => void;
};

const DeleteEvent = ({ itemTitle, itemID, onLeft }: DeleteEventProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        throw new Error("Unauthorized. Please sign in again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${itemID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(result?.message || "Something went wrong.");
        return;
      }

      toast.success(result?.message || "Event deleted successfully");

      // Update the parent list immediately
      onLeft?.();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(
        err instanceof Error ? err.message : "Unable to delete the event.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          aria-label={`Delete ${itemTitle}`}
          variant="tertiary"
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-content-secondary/15 bg-foreground text-content-secondary transition-all duration-200 hover:border-danger/30 hover:bg-danger/10 hover:text-danger active:scale-95"
        >
          <FiTrash2 className="text-base" aria-hidden />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-full max-w-[400px] border border-content-secondary/15 bg-foreground text-content-primary">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading className="text-content-primary">
                Delete event permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-sm leading-relaxed text-content-secondary">
                This will permanently delete{" "}
                <strong className="font-semibold text-content-primary">
                  {itemTitle}
                </strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                isDisabled={loading}
                className="text-content-secondary hover:bg-primary/10 hover:text-primary"
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onPress={handleDelete}
                isDisabled={loading}
                className="bg-danger font-medium text-white hover:opacity-90"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteEvent;
