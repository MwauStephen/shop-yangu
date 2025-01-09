// const UploadButton = ({ ...rest }) => {
//   return (
//     <FileUploadRoot>
//       <FileUploadTrigger asChild>
//         <Button variant="outline" size="sm" {...rest}>
//           <HiUpload /> Upload file
//         </Button>
//       </FileUploadTrigger>
//       <FileUploadList />
//     </FileUploadRoot>
//   );
// };

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   DialogActionTrigger,
//   DialogBody,
//   DialogCloseTrigger,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogRoot,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useState } from "react";

// const ViewCard = ({
//   triggerContent, // Content for the button or element that opens the modal
//   title, // Modal title
//   children, // Content inside the modal
//   footerActions, // Footer actions as an array of JSX elements
// }) => {
//   const [isOpen, setIsOpen] = useState();

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);
//   return (
//     <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild onClick={handleOpen}>
//         {triggerContent}
//       </DialogTrigger>

//       <DialogContent>
//         {title && (
//           <DialogHeader>
//             <DialogTitle>{title}</DialogTitle>
//           </DialogHeader>
//         )}

//         <DialogBody>{children({ handleClose })}</DialogBody>

//         {footerActions && (
//           <DialogFooter>
//             {footerActions.map((action, index) => (
//               <DialogActionTrigger asChild key={index}>
//                 {action}
//               </DialogActionTrigger>
//             ))}
//           </DialogFooter>
//         )}

//         <DialogCloseTrigger asChild>
//           <Button onClick={handleClose}>Close</Button>
//         </DialogCloseTrigger>
//         {/* <DialogCloseTrigger /> */}
//       </DialogContent>
//     </DialogRoot>
//   );
// };

// export default ViewCard;

// export const updateShop = async (shop, id) => {
//   if (!id) {
//     throw new Error("Shop ID is required for updating");
//   }

//   const hasImagePath = shop.logo?.startsWith?.(supabaseUrl);

//   let imagePath = shop.logo;

//   // Generate new image path if a file is provided
//   if (!hasImagePath && shop.logo?.name) {
//     const imageName = `${Math.random()}-${shop.logo.name}`.replace(" /", "");
//     imagePath = `${supabaseUrl}/storage/v1/object/public/shops/${imageName}`;
//   }

//   // Update the shop details in the database
//   const { data, error } = await supabase
//     .from("shops")
//     .update({ ...shop, logo: imagePath })
//     .eq("id", id)
//     .select()
//     .single(); // Ensure only one row is returned

//   if (error) {
//     console.error("Error updating shop:", error);
//     throw new Error("Shop could not be updated");
//   }

//   // If the logo is already a valid path or no new file is provided, return the updated data
//   if (hasImagePath || !shop.logo?.name) {
//     return data;
//   }

//   // Upload the new logo to Supabase storage
//   const imageName = `${Math.random()}-${shop.logo.name}`;
//   const { error: storageError } = await supabase.storage
//     .from("shops")
//     .upload(imageName, shop.logo);

//   // Log storage error but do not delete the shop
//   if (storageError) {
//     console.error("Image upload error:", storageError);
//     throw new Error(
//       "Shop image could not be uploaded, but shop details were updated"
//     );
//   }

//   return data;
// };

// const items = [
//     {
//       id: 1,
//       name: "Fashion Fiesta",
//       description: "Your tech paradise.",
//       price: "Ksh 500.",
//       stock: 30,
//       image: "/shop-1.jpg",
//     },
//     {
//       id: 2,
//       name: "Fashion Fiesta",
//       description: "Your tech paradise.",
//       price: "Ksh 500.",
//       stock: 30,
//       image: "/shop-1.jpg",
//     },
//     {
//       id: 3,
//       name: "Fashion Fiesta",
//       description: "Your tech paradise.",
//       price: "Ksh 500.",
//       stock: 30,
//       image: "/shop-1.jpg",
//     },
//     {
//       id: 4,
//       name: "Fashion Fiesta",
//       description: "Your tech paradise.",
//       price: "Ksh 500.",
//       stock: 30,
//       image: "/shop-1.jpg",
//     },
//     {
//       id: 5,
//       name: "Fashion Fiesta",
//       description: "Your tech paradise.",
//       price: "Ksh 500.",
//       stock: 30,
//       image: "/shop-1.jpg",
//     },
//     {
//       id: 6,
//       name: "Fashion Fiesta",
//       description: "Your tech paradise.",
//       price: "Ksh 500.",
//       stock: 30,
//       image: "/shop-1.jpg",
//     },
//   ];

// api functions
// 1.api function for selecting all shops
// export const getAllShops = async () => {
//   const { data, error, count } = await supabase
//     .from("shops")
//     .select("*", { count: "exact" });
//   if (error)
//     throw new Error(`Shop details could not be fetched.${error.message}`);
//   return { data, count };
// };

// 4.api function for deleting a product
// export const deleteProduct = async (id) => {
//   const { data, error } = await supabase.from("products").delete().eq("id", id);
//   if (error) throw new Error(error.message);
//   return data;
// };


// export const deleteShop = async (id) => {
//   const { data, error } = await supabase.from("shops").delete().eq("id", id);
//   if (error) throw new Error(`Shop could not be deleted.${error.message}`);
//   return data;
// };

// 1.api function for selecting all products
// export const getAllProducts = async () => {
//   const { data, error, count } = await supabase
//     .from("products")
//     .select("*", { count: "exact" });
//   if (error)
//     throw new Error(`Product details couldn't be fetched.${error.message}`);
//   return { data, count };
// };

// import React from "react";
// import { Provider } from "@/components/ui/provider";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Roboto } from "next/font/google";
// import QueryProvider from "@/components/QueryProvider";
// import ToastContainer from "@/components/ToastContainer";

// // loading fonts
// const roboto = Roboto({
//   display: "swap",
//   weight: "400",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Shop Yangu | E-commerce",
//   description: "An E-commerce admin dashboard",
// };

// const RootLayout = ({ children }) => {
//   return (
//     <html lang="en">
//       <body className={roboto.className}>
//         <Provider>
//           <ToastContainer />
//           <QueryProvider>
//             <DashboardLayout>{children}</DashboardLayout>
//           </QueryProvider>
//         </Provider>
//       </body>
//     </html>
//   );
// };

// export default RootLayout;