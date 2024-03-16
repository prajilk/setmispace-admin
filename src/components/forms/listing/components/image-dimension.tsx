const ImageDimension = ({ w, h }: { w: number; h: number }) => {
    return (
        <span className="text-xs text-gray-400 flex justify-end">
            {w}&#xD7;{h}
        </span>
    );
};

export default ImageDimension;
