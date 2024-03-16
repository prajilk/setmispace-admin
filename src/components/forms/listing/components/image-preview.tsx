import { Trash2 } from "lucide-react";
import { useGlobalContext } from "../../../../context/store";
import { ImagePreviewProps } from "../../../../lib/types";

const ImagePreview = ({
    image,
    action,
    galleryImageIndex,
}: ImagePreviewProps) => {
    const { setImages } = useGlobalContext();

    function handleDeleteImage() {
        if (action === "thumbnail") {
            setImages((prev) => ({
                ...prev,
                thumbnail: "",
            }));
        } else {
            setImages((prev) => ({
                ...prev,
                logo: "",
            }));
        }
    }

    function handleDeleteGalleryImage() {
        setImages((prev) => ({
            ...prev,
            gallery: prev.gallery.filter(
                (_, index) => index !== galleryImageIndex
            ),
        }));
    }

    return (
        <div className="relative h-full w-20 flex-shrink-0 md:w-16 lg:w-20 flex items-center">
            <img
                className="bg-gray-200"
                src={image}
                alt="Image"
                sizes="200px"
            />
            <button
                type="button"
                className="absolute -right-3 top-2 z-50 rounded-full bg-red-500 p-1"
                onClick={() => {
                    action === "thumbnail" || action === "logo"
                        ? handleDeleteImage()
                        : handleDeleteGalleryImage();
                }}
            >
                <Trash2 className="text-white" size={15} />
            </button>
        </div>
    );
};

export default ImagePreview;
