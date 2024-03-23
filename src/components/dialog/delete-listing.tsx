import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useDeleteListing } from "../../api-hooks/delete-listing";
import { toast } from "sonner";

const DeleteListing = ({ id }: { id: string }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const delete_mutation = useDeleteListing(() =>
        toast.success("Business removed successfully")
    );
    return (
        <>
            <Tooltip color="danger" content="Delete Product" showArrow>
                <Button
                    onPress={onOpen}
                    variant="light"
                    radius="full"
                    size="sm"
                    color="danger"
                    isIconOnly
                >
                    <Trash2 size={20} />
                </Button>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Delete Business?
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-sm dark:text-zinc-400">
                                    This action remove this business from
                                    database.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="default"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={() => delete_mutation.mutate(id)}
                                    isLoading={delete_mutation.isPending}
                                >
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteListing;
