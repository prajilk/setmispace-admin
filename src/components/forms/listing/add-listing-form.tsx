import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { z } from "zod";
import { ZodListingSchema } from "../../../lib/zod-schemas/schema";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { useState } from "react";
import { Show } from "../../shared/show";
import PaidListingForm from "./paid-listing-form";
import ImagePicker from "../../dialog/image-picker";
import { useGlobalContext } from "../../../context/store";
import ImagePreview from "./components/image-preview";
import ImageDimension from "./components/image-dimension";
import { useFeatures } from "../../../api-hooks/get-features";
import { useNewListing } from "../../../api-hooks/new-listing";
import { toast } from "sonner";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useCategories } from "../../../api-hooks/get-categories";

const AddListingForm = () => {
    const [plan, setPlan] = useState<"free" | "paid">("free");
    const { images, setImages } = useGlobalContext();

    // Fetch Features and Categories from server
    const { data: features, isLoading: isFeaturesLoading } = useFeatures();
    const { data: categories, isLoading: isCategoriesLoading } =
        useCategories();

    // 1. Define your form.
    const form = useForm<z.infer<typeof ZodListingSchema>>({
        resolver: zodResolver(ZodListingSchema),
        defaultValues: {
            business: "",
            address: "",
            description: "",
            mail: "",
            phone: "",
            tags: "",
            website: "",
            facebook: "",
            features: "",
            instagram: "",
            mapLink: "",
            twitter: "",
            youtube: "",
        },
    });

    function onSuccess() {
        toast.success("New business added successfully");
        form.reset();
        setImages({
            thumbnail: "",
            gallery: [],
        });
        setPlan("free");
    }

    const mutation = useNewListing(onSuccess);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ZodListingSchema>) {
        if (images.thumbnail !== "") {
            mutation.mutate({ ...values, images, plan });
        } else {
            toast.error("Please add an thumbnail for the listing.");
        }
    }

    function handlePlan() {
        setPlan((prev) => (prev === "free" ? "paid" : "free"));
        form.setValue("facebook", "");
        form.setValue("instagram", "");
        form.setValue("twitter", "");
        form.setValue("youtube", "");
        form.setValue("phone", "");
        form.setValue("mail", "");
        form.setValue("mapLink", "");
        form.setValue("features", "");
        form.setValue("website", "");
        form.setValue("category", "");

        setImages((prev) => ({
            ...prev,
            logo: null,
            featured: null,
            gallery: [],
        }));
    }

    return (
        <>
            <div className="flex gap-3 items-center mb-6">
                <label
                    className="font-bold text-xl cursor-pointer"
                    htmlFor="paid"
                >
                    This is a{" "}
                    <Show>
                        <Show.When isTrue={plan === "paid"}>
                            <b className="text-green-500">PAID</b>
                        </Show.When>
                        <Show.Else>
                            <b className="text-yellow-500">FREE</b>
                        </Show.Else>
                    </Show>{" "}
                    Business
                </label>
                <Checkbox
                    id="paid"
                    checked={plan === "paid"}
                    onCheckedChange={handlePlan}
                />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="business"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Business name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Show>
                        <Show.When isTrue={plan === "paid"}>
                            <PaidListingForm
                                form={form}
                                isLoading={isFeaturesLoading}
                                features={features}
                            />
                        </Show.When>
                    </Show>
                    <div>
                        <FormLabel>Images</FormLabel>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <div className="bg-white border rounded-md px-2">
                            <span className="text-xs">Thumbnail</span>
                            <div className="w-24 h-24 flex justify-center items-center">
                                {images.thumbnail === "" ? (
                                    <ImagePicker action="thumbnail" />
                                ) : (
                                    <ImagePreview
                                        image={images.thumbnail}
                                        action="thumbnail"
                                    />
                                )}
                            </div>
                            <ImageDimension w={370} h={265} />
                        </div>
                        <Show>
                            <Show.When isTrue={plan === "paid"}>
                                <div className="bg-white border rounded-md px-2">
                                    <span className="text-xs">Logo</span>
                                    <div className="w-24 h-24 flex justify-center items-center">
                                        {images.logo === null ||
                                        images.logo === undefined ||
                                        images.logo === "" ? (
                                            <ImagePicker action="logo" />
                                        ) : (
                                            <ImagePreview
                                                image={images.logo}
                                                action="logo"
                                            />
                                        )}
                                    </div>
                                    <ImageDimension w={150} h={100} />
                                </div>
                                <div className="bg-white border rounded-md px-2">
                                    <span className="text-xs">Featured</span>
                                    <div className="w-24 h-24 flex justify-center items-center">
                                        {images.featured === null ||
                                        images.featured === undefined ||
                                        images.featured === "" ? (
                                            <ImagePicker action="featured" />
                                        ) : (
                                            <ImagePreview
                                                image={images.featured}
                                                action="featured"
                                            />
                                        )}
                                    </div>
                                    <ImageDimension w={1920} h={520} />
                                </div>
                                <div className="bg-white border rounded-md px-2 w-[100px] flex-1">
                                    <span className="text-xs">Gallery</span>
                                    <div className="w-full h-24 flex justify-end items-center gap-2">
                                        <div className="h-full flex flex-1 gap-3 overflow-x-scroll scrollbar-hide">
                                            {images.gallery.map(
                                                (image, index) => (
                                                    <ImagePreview
                                                        image={image}
                                                        action="gallery"
                                                        galleryImageIndex={
                                                            index
                                                        }
                                                        key={index}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <ImagePicker action="gallery" />
                                    </div>
                                    <ImageDimension w={770} h={510} />
                                </div>
                            </Show.When>
                        </Show>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <Select
                                        aria-label="Category Selector"
                                        onChange={field.onChange}
                                        isLoading={isCategoriesLoading}
                                        placeholder="Select category"
                                        selectionMode="single"
                                        classNames={{
                                            trigger:
                                                "p-0 px-3 min-h-unit-2 h-10 rounded-md bg-white data-[hover=true]:bg-white border",
                                            popoverContent:
                                                "overflow-y-scroll scrollbar-hide",
                                        }}
                                    >
                                        {categories
                                            ? categories.map((category) => (
                                                  <SelectItem
                                                      key={category.value}
                                                      value={category.value}
                                                  >
                                                      {category.label}
                                                  </SelectItem>
                                              ))
                                            : []}
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tags" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Separate multiple tags with comma (,)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="hover:bg-sky-700"
                        color="primary"
                        radius="sm"
                        isLoading={mutation.isPending}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default AddListingForm;
