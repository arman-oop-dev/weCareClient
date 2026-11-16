// import { Rocket } from "@gravity-ui/icons";
// import { AlertDialog, Button } from "@heroui/react";
// import { FiEdit2 } from "react-icons/fi";
// import UpdateForm from "./UpdateForm";

// type UpdateEventProps = {
//   itemID: string;
// };

// const UpdateEvent = ({ itemID }: UpdateEventProps) => {
//   return (
//     <AlertDialog>
//       <Button
//         variant="secondary"
//         aria-label="Edit event"
//         className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
//       >
//         <FiEdit2 className="text-base" aria-hidden />
//       </Button>

//       <AlertDialog.Backdrop>
//         <AlertDialog.Container size="cover">
//           <AlertDialog.Dialog>
//             <AlertDialog.CloseTrigger />
//             <AlertDialog.Header>
//               <AlertDialog.Icon className="bg-default text-foreground">
//                 <Rocket className="size-5" />
//               </AlertDialog.Icon>
//               <AlertDialog.Heading>Update Event</AlertDialog.Heading>
//             </AlertDialog.Header>
//             <AlertDialog.Body>
//               <UpdateForm itemID={itemID} />
//             </AlertDialog.Body>
//           </AlertDialog.Dialog>
//         </AlertDialog.Container>
//       </AlertDialog.Backdrop>
//     </AlertDialog>
//   );
// };

// export default UpdateEvent;
