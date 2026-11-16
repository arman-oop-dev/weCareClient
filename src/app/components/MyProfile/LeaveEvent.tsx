// "use client";

// import { authClient } from "@/app/lib/auth-client";
// import { AlertDialog, Button } from "@heroui/react";
// import { useState } from "react";
// import { FiLogOut } from "react-icons/fi";

// type LeaveEventProps = {
//   itemTitle: string;
//   itemID: string;
//   onLeft?: () => void;
// };

// const LeaveEvent = ({ itemTitle, itemID, onLeft }: LeaveEventProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleOpenChange = (open: boolean) => {
//     if (loading) return;

//     setIsOpen(open);

//     if (!open) setError(null);
//   };

//   const handleLeave = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { data: tokenData, error: tokenError } = await authClient.token();

//       if (tokenError || !tokenData?.token) {
//         throw new Error("Unauthorized. Please log in again.");
//       }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/events/participantuser/${itemID}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${tokenData.token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => null);
//         throw new Error(errorData?.message || "Failed to leave event");
//       }

//       setIsOpen(false);
//       onLeft?.();
//     } catch (err) {
//       console.error("Leave failed:", err);
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         aria-label={`Leave ${itemTitle}`}
//         variant="tertiary"
//         onPress={() => setIsOpen(true)}
//         className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-content-secondary/15 bg-foreground text-content-secondary transition-all duration-200 hover:border-danger/30 hover:bg-danger/10 hover:text-danger active:scale-95"
//       >
//         <FiLogOut className="text-base" aria-hidden />
//       </Button>

//       <AlertDialog>
//         <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
//           <AlertDialog.Container>
//             <AlertDialog.Dialog className="w-full max-w-[400px] border border-content-secondary/15 bg-foreground text-content-primary">
//               <AlertDialog.CloseTrigger />

//               <AlertDialog.Header>
//                 <AlertDialog.Icon status="danger" />

//                 <AlertDialog.Heading className="text-content-primary">
//                   Leave this event?
//                 </AlertDialog.Heading>
//               </AlertDialog.Header>

//               <AlertDialog.Body>
//                 <p className="text-sm leading-relaxed text-content-secondary">
//                   You&apos;ll be removed from{" "}
//                   <strong className="font-semibold text-content-primary">
//                     {itemTitle}
//                   </strong>
//                   . You can join again later.
//                 </p>

//                 {error && (
//                   <p
//                     className="mt-3 rounded-lg border border-danger/20 bg-danger/10 p-3 text-sm text-danger"
//                     role="alert"
//                   >
//                     {error}
//                   </p>
//                 )}
//               </AlertDialog.Body>

//               <AlertDialog.Footer>
//                 <Button
//                   variant="tertiary"
//                   isDisabled={loading}
//                   onPress={() => handleOpenChange(false)}
//                   className="text-content-secondary hover:bg-primary/10 hover:text-primary"
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   variant="danger"
//                   onPress={handleLeave}
//                   isDisabled={loading}
//                   className="bg-danger font-medium text-white hover:opacity-90"
//                 >
//                   {loading ? "Leaving..." : "Leave"}
//                 </Button>
//               </AlertDialog.Footer>
//             </AlertDialog.Dialog>
//           </AlertDialog.Container>
//         </AlertDialog.Backdrop>
//       </AlertDialog>
//     </>
//   );
// };

// export default LeaveEvent;
