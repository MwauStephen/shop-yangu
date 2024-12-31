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

// const ViewCard = ({ children }) => {
//   return (
//     <DialogRoot>
//       <DialogTrigger asChild>
//         {children}
//         {/* <Button variant="outline" size="sm">
//           Open Dialog
//         </Button> */}
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Dialog Title</DialogTitle>
//         </DialogHeader>
//         <DialogBody>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//         </DialogBody>
//         <DialogFooter>
//           <DialogActionTrigger asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogActionTrigger>
//           <Button>Save</Button>
//         </DialogFooter>
//         <DialogCloseTrigger />
//       </DialogContent>
//     </DialogRoot>
//   );
// };

// export default ViewCard;

"use client";

import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ViewCard = ({
  triggerContent, // Content for the button or element that opens the modal
  title, // Modal title
  children, // Content inside the modal
  footerActions, // Footer actions as an array of JSX elements
}) => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <DialogBody>{children}</DialogBody>

        {footerActions && (
          <DialogFooter>
            {footerActions.map((action, index) => (
              <DialogActionTrigger asChild key={index}>
                {action}
              </DialogActionTrigger>
            ))}
          </DialogFooter>
        )}

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ViewCard;
