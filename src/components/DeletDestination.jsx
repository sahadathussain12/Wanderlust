"use client";

import { AlertDialog, Button } from "@heroui/react";
import React from "react";
import { FiDelete } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DeletDestination = ({ destination }) => {
  const { _id, destinationName } = destination;

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log(data, "deleted");

      if (res.ok) {
        router.push("/destinations");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button
          className="text-sm font-bold text-red-400"
          variant="outline"
        >
          <FiDelete />
          Delete Project
        </Button>

        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />

                <AlertDialog.Heading>
                  Delete destination permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong className="font-bold text-2xl text-red-400">
                    {destinationName}
                  </strong>{" "}
                  and all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  slot="close"
                  variant="danger"
                >
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeletDestination;