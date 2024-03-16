import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import { useGlobalContext } from "../../context/store";
import { toast } from "sonner";
import ImagePreview from "../forms/listing/components/image-preview";
import { Show } from "../shared/show";
import { ImagePickerProps } from "../../lib/types";

const ImagePicker = ({ action }: ImagePickerProps) => {
    const { images, setImages } = useGlobalContext();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.forEach((file) => {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    if (
                        action === "thumbnail" &&
                        img.naturalWidth !== 370 &&
                        img.naturalHeight !== 265
                    ) {
                        toast.error(
                            "You selected the incorrect image dimensions! required dimensions 370x265 pixels."
                        );
                    }

                    if (
                        action === "featured" &&
                        img.naturalWidth !== 1920 &&
                        img.naturalHeight !== 520
                    ) {
                        toast.error(
                            "You selected the incorrect image dimensions! required dimensions 1920x520 pixels."
                        );
                    }

                    if (
                        action === "logo" &&
                        img.naturalWidth !== 150 &&
                        img.naturalHeight !== 100
                    ) {
                        toast.error(
                            "You selected the incorrect image dimensions! required dimensions 150x100 pixels."
                        );
                    }

                    const reader = new FileReader();

                    reader.onload = () => {
                        const binaryStr = reader.result;

                        if (action === "thumbnail") {
                            setImages((prev) => ({
                                ...prev,
                                thumbnail:
                                    typeof binaryStr === "string"
                                        ? binaryStr
                                        : prev.thumbnail,
                            }));
                        } else if (action === "logo") {
                            setImages((prev) => ({
                                ...prev,
                                logo:
                                    typeof binaryStr === "string"
                                        ? binaryStr
                                        : prev.logo,
                            }));
                        } else {
                            setImages((prev) => ({
                                ...prev,
                                gallery: Array.isArray(prev.gallery)
                                    ? [
                                          ...prev.gallery,
                                          typeof binaryStr === "string"
                                              ? binaryStr
                                              : "",
                                      ]
                                    : prev.gallery,
                            }));
                        }
                    };
                    reader.readAsDataURL(file);
                };
            });
        },
        [action, setImages]
    );

    return (
        <div className="flex-shrink-0">
            <Button
                onPress={onOpen}
                isIconOnly
                type="button"
                className="bg-sky-200 text-sky-600 hover:bg-sky-300/80"
            >
                <Plus size={20} className="text-sky-600" />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Upload Product Images.
                            </ModalHeader>
                            <ModalBody className="mb-5">
                                <Dropzone
                                    onDrop={onDrop}
                                    accept={{
                                        "image/jpeg": [],
                                        "image/png": [],
                                        "image/webp": [],
                                    }}
                                    multiple={
                                        action !== "thumbnail" &&
                                        action !== "logo"
                                    }
                                >
                                    {({
                                        getRootProps,
                                        getInputProps,
                                        isDragActive,
                                    }) => (
                                        <div
                                            className={`${
                                                isDragActive
                                                    ? "border-blue-500"
                                                    : "border-gray-300"
                                            } h-28 w-full rounded-lg border-2 border-dashed bg-gray-100 dark:bg-zinc-800/50`}
                                        >
                                            <div
                                                {...getRootProps({
                                                    className:
                                                        "flex h-full items-center justify-center p-5 text-center",
                                                    onDrop: (event) =>
                                                        event.stopPropagation(),
                                                })}
                                            >
                                                <input {...getInputProps()} />
                                                <div className="flex h-full cursor-default items-center justify-center p-5 text-center">
                                                    {isDragActive ? (
                                                        <p>
                                                            Drop the files here
                                                            ...
                                                        </p>
                                                    ) : (
                                                        <p>
                                                            Drag &apos;n&apos;
                                                            drop images here, or
                                                            click to select
                                                            files
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                                <Show>
                                    <Show.When isTrue={action === "gallery"}>
                                        <div className="flex h-20 w-full gap-3 overflow-x-scroll scrollbar-hide">
                                            {images.gallery?.map((image, i) => (
                                                <ImagePreview
                                                    image={image}
                                                    action="gallery"
                                                    key={i}
                                                />
                                            ))}
                                        </div>
                                    </Show.When>
                                </Show>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ImagePicker;
