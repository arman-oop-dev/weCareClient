// "use client";

// import { authClient } from "@/app/lib/auth-client";
// import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, type FormEvent } from "react";
// import {
//   FaCalendarAlt,
//   FaCheck,
//   FaHeading,
//   FaImage,
//   FaMapMarkerAlt,
//   FaTag,
// } from "react-icons/fa";

// const eventCategories = [
//   "Cleanup",
//   "Plantation",
//   "Donation",
//   "Blood Donation",
//   "Education",
//   "Health Camp",
//   "Other",
// ];

// const MAX_DESCRIPTION = 1000;

// const labelClass =
//   "mb-2 flex items-center gap-2 text-sm font-semibold text-content-primary";

// const hintClass = "mt-1.5 text-xs text-content-secondary";

// type EventItem = {
//   _id?: string;
//   title?: string;
//   description?: string;
//   eventType?: string;
//   thumbnail?: string;
//   eventDate?: string;
//   location?: string;
// };

// type UpdateFormProps = {
//   itemID: string;
//   onSuccess?: () => void;
// };

// const UpdateForm = ({ itemID, onSuccess }: UpdateFormProps) => {
//   const router = useRouter();
//   const { data: session } = authClient.useSession();

//   const [eventData, setEventData] = useState<EventItem | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [categoryError, setCategoryError] = useState(false);
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Load the existing event and prefill the form
//   useEffect(() => {
//     let ignore = false;

//     const loadEvent = async () => {
//       try {
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//         if (!apiUrl) throw new Error("API URL is not configured.");

//         const res = await fetch(`${apiUrl}/events/${itemID}`);
//         const data = await res.json().catch(() => ({}));

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to load event details.");
//         }

//         if (ignore) return;

//         // Support both { ...event } and { event: {...} } responses
//         const event: EventItem = data.event ?? data;
//         setEventData(event);
//         setDescription(event.description ?? "");
//         setCategory(event.eventType ?? "");
//       } catch (err) {
//         if (!ignore) {
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Failed to load event details.",
//           );
//         }
//       } finally {
//         if (!ignore) setIsLoading(false);
//       }
//     };

//     loadEvent();

//     return () => {
//       ignore = true;
//     };
//   }, [itemID]);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (isSubmitting) return;

//     if (!session?.user) {
//       setError("Please sign in before updating an event.");
//       return;
//     }

//     if (!category) {
//       setCategoryError(true);
//       return;
//     }

//     setCategoryError(false);

//     const formValues = Object.fromEntries(
//       new FormData(e.currentTarget).entries(),
//     );

//     setIsSubmitting(true);

//     try {
//       const { data: tokenData } = await authClient.token();

//       if (!tokenData?.token) {
//         setError("Authentication token not found. Please sign in again.");
//         return;
//       }

//       // /events/:id
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/events/${itemID}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${tokenData.token}`,
//           },
//           body: JSON.stringify(formValues),
//         },
//       );

//       const result = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         setError(result.message || "Something went wrong.");
//         return;
//       }

//       onSuccess?.();
//       router.refresh();
//     } catch (err) {
//       console.error("Event update error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to update your event. Please try again.",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <p className="py-10 text-center text-sm text-content-secondary">
//         Loading event details...
//       </p>
//     );
//   }

//   if (!eventData) {
//     return (
//       <div
//         role="alert"
//         className="rounded-lg border border-danger/20 bg-danger/10 p-4 text-sm text-danger"
//       >
//         {error || "Event not found."}
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="grid overflow-hidden rounded-2xl border border-content-secondary/15 bg-foreground lg:grid-cols-[1fr_1.5fr]"
//     >
//       {/* LEFT COLUMN: Category & Cover Image */}
//       <div className="border-b border-content-secondary/15 bg-background p-6 sm:p-8 lg:border-b-0 lg:border-r">
//         <div className="mb-10">
//           <Label className={labelClass}>
//             <FaTag className="text-primary" />
//             Select Category
//           </Label>

//           <div className="mt-3 grid grid-cols-2 gap-2.5">
//             {eventCategories.map((item) => {
//               const active = category === item;

//               return (
//                 <button
//                   key={item}
//                   type="button"
//                   onClick={() => {
//                     setCategory(item);
//                     setCategoryError(false);
//                   }}
//                   className={`group flex items-center justify-between rounded-lg border p-3 text-left transition-all duration-200 ${
//                     active
//                       ? "border-primary bg-primary/10 ring-1 ring-primary"
//                       : "border-content-secondary/15 bg-foreground hover:border-primary/50 hover:bg-primary/5"
//                   }`}
//                 >
//                   <span
//                     className={`text-sm font-medium ${
//                       active ? "text-primary" : "text-content-primary"
//                     }`}
//                   >
//                     {item}
//                   </span>

//                   <div
//                     className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
//                       active
//                         ? "border-primary bg-primary text-white"
//                         : "border-content-secondary/30 text-transparent"
//                     }`}
//                   >
//                     <FaCheck size={10} />
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           <input type="hidden" name="eventType" value={category} />

//           {categoryError && (
//             <p className="mt-3 text-sm font-medium text-danger" role="alert">
//               Please select a category.
//             </p>
//           )}
//         </div>

//         <TextField
//           name="thumbnail"
//           variant="secondary"
//           isRequired
//           defaultValue={eventData.thumbnail ?? ""}
//         >
//           <Label className={labelClass}>
//             <FaImage className="text-primary" />
//             Cover Image URL
//           </Label>

//           <Input
//             type="url"
//             className="w-full"
//             placeholder="https://example.com/image.jpg"
//           />

//           <p className={hintClass}>Landscape images work best.</p>
//         </TextField>
//       </div>

//       {/* RIGHT COLUMN: Main Fields */}
//       <div className="space-y-8 bg-foreground p-6 sm:p-8">
//         <div className="space-y-6">
//           <TextField
//             name="title"
//             variant="secondary"
//             isRequired
//             defaultValue={eventData.title ?? ""}
//           >
//             <Label className={labelClass}>
//               <FaHeading className="text-primary" />
//               Event Title
//             </Label>

//             <Input
//               className="w-full"
//               placeholder="e.g. Community cleanup drive"
//               maxLength={100}
//             />
//           </TextField>

//           <TextField
//             name="description"
//             variant="secondary"
//             isRequired
//             value={description}
//             onChange={setDescription}
//           >
//             <Label className={labelClass}>Description</Label>

//             <TextArea
//               className="w-full"
//               placeholder="What will happen, who should come..."
//               rows={4}
//               maxLength={MAX_DESCRIPTION}
//             />

//             <p
//               className={`mt-2 text-right text-xs ${
//                 description.length > MAX_DESCRIPTION * 0.9
//                   ? "text-danger"
//                   : "text-content-secondary"
//               }`}
//             >
//               {description.length}/{MAX_DESCRIPTION}
//             </p>
//           </TextField>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2">
//           <TextField
//             name="eventDate"
//             variant="secondary"
//             isRequired
//             defaultValue={eventData.eventDate?.slice(0, 10) ?? ""}
//           >
//             <Label className={labelClass}>
//               <FaCalendarAlt className="text-primary" />
//               Date
//             </Label>

//             <Input type="date" className="w-full" />
//           </TextField>

//           <TextField
//             name="location"
//             variant="secondary"
//             isRequired
//             defaultValue={eventData.location ?? ""}
//           >
//             <Label className={labelClass}>
//               <FaMapMarkerAlt className="text-primary" />
//               Location
//             </Label>

//             <Input className="w-full" placeholder="e.g. Subid Bazar, Sylhet" />
//           </TextField>
//         </div>

//         {error && (
//           <div
//             role="alert"
//             className="rounded-lg border border-danger/20 bg-danger/10 p-4 text-sm text-danger"
//           >
//             {error}
//           </div>
//         )}

//         <Button
//           type="submit"
//           isDisabled={isSubmitting}
//           className="w-full rounded-lg bg-primary py-6 text-base font-semibold text-white transition-colors hover:bg-secondary"
//         >
//           {isSubmitting ? "Updating Event..." : "Update Event"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default UpdateForm;
