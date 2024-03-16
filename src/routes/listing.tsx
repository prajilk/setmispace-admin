import { Route, Routes } from "react-router-dom";
import Listings from "../pages/listings/listings";
import AddListing from "../pages/listings/add-listing";

const ListingRoutes = () => {
    return (
        <Routes>
            <Route index element={<Listings />} />
            <Route path="add" element={<AddListing />} />
        </Routes>
    );
};

export default ListingRoutes;
