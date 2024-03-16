import { z } from "zod";
import { ZodListingSchema } from "./zod-schemas/schema";

type Admin = {
    _id: string;
    name: string;
    email: string;
};

type Feature = {
    _id: string;
    label: string;
    value: string;
    icon: string;
};

type Business = z.infer<typeof ZodListingSchema> &
    Images & {
        plan: "free" | "paid";
        _id: string;
    };

type Category = {
    _id: string;
    label: string;
    value: string;
};

type Images = {
    thumbnail: string;
    featured?: string | null;
    logo?: string | null;
    gallery: string[];
};

type ImagePickerProps = {
    action: "thumbnail" | "logo" | "gallery" | "featured";
};

type ImagePreviewProps = ImagePickerProps & {
    image: string;
    galleryImageIndex?: number;
};

export type {
    Admin,
    Category,
    Feature,
    ImagePickerProps,
    ImagePreviewProps,
    Images,
    Business,
};
