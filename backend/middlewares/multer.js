import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloud.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image";
    let format;
    const originalName = file.originalname.split(".")[0];
    const ext = file.originalname.split(".").pop();

    if (file.mimetype === "application/pdf") {
      resourceType = "auto";
      format = "pdf";
    }

    return {
      folder: "smart_portfolio",
      resource_type: resourceType,
      allowed_formats: ["jpg", "png", "pdf"],
      // 👇 public_id me extension add kar diya
      public_id: `${originalName}.${ext}`,
      ...(format && { format }),
    };
  },
});

export const upload = multer({ storage });