import React, { forwardRef } from "react";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "./ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { Button } from "./ui/button";

const UploadButton = forwardRef(({ required, ...rest }, ref) => (
  <FileUploadRoot ref={ref} {...rest}>
    <FileUploadTrigger asChild>
      <Button variant="outline" size="sm">
        <HiUpload /> Upload file
      </Button>
    </FileUploadTrigger>
    <FileUploadList required={required} />
  </FileUploadRoot>
));
UploadButton.displayName = "UploadButton";
export default UploadButton;
