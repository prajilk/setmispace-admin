import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { ZodListingSchema } from "../../../lib/zod-schemas/schema";
import { z } from "zod";
import { Select, SelectItem } from "@nextui-org/react";
import { Feature } from "../../../lib/types";

type PaidListingFormProps = {
    form: UseFormReturn<z.infer<typeof ZodListingSchema>, any>;
    isLoading: boolean;
    features?: Feature[] | null;
};

const PaidListingForm = ({
    form,
    isLoading,
    features,
}: PaidListingFormProps) => {
    return (
        <div className="space-y-2 pt-6">
            <h2 className="text-gray-400 font-medium">Paid features below.</h2>

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid md:grid-cols-2 gap-2">
                <FormField
                    control={form.control}
                    name="mail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Business mail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business website</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Business website"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-2">
                <FormField
                    control={form.control}
                    name="mapLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location Link</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Google map's location url"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Features</FormLabel>
                            <Select
                                aria-label="Feature Selector"
                                isLoading={isLoading}
                                onChange={field.onChange}
                                placeholder="Select features"
                                selectionMode="multiple"
                                classNames={{
                                    trigger:
                                        "p-0 px-3 min-h-unit-2 h-10 rounded-md bg-white data-[hover=true]:bg-white border",
                                    popoverContent:
                                        "overflow-y-scroll scrollbar-hide",
                                }}
                            >
                                {features
                                    ? features.map((feature) => (
                                          <SelectItem
                                              key={feature.value}
                                              value={feature.value}
                                          >
                                              {feature.label}
                                          </SelectItem>
                                      ))
                                    : []}
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-2">
                <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Facebook Profile"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Twitter Profile"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-2">
                <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Instagram Profile"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="youtube"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Youtube</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Youtube Profile"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default PaidListingForm;
