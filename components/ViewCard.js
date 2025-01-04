"use client";

import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.isOpen)}>
      <DialogTrigger asChild onClick={handleOpen}>
        {triggerContent}
      </DialogTrigger>

      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <DialogBody>{React.cloneElement(children, { handleClose })}</DialogBody>

        {footerActions && (
          <DialogFooter>
            {footerActions.map((action, index) => (
              <DialogActionTrigger asChild key={index}>
                {action}
              </DialogActionTrigger>
            ))}
          </DialogFooter>
        )}

        {/* <DialogCloseTrigger asChild>
          <Button onClick={handleClose}>Close</Button>
        </DialogCloseTrigger> */}
      </DialogContent>
    </DialogRoot>
  );
};

export default ViewCard;
