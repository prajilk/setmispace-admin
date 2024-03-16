import { Spinner } from "@nextui-org/react";

const PageLoading = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[rgb(247,250,252)]">
            <Spinner />
        </div>
    );
};

export default PageLoading;
