import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Selection,
    SortDescriptor,
    Pagination,
    Chip,
    ChipProps,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Spinner,
} from "@nextui-org/react";
import { ChevronDown, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { useListings } from "../../api-hooks/get-listings";
import { Business } from "../../lib/types";

const statusColorMap: Record<string, ChipProps["color"]> = {
    paid: "success",
    free: "warning",
};

const columns = [
    { name: "ID", uid: "id" },
    { name: "BUSINESS", uid: "business", sortable: true },
    { name: "DESCRIPTION", uid: "description" },
    { name: "ADDRESS", uid: "address" },
    { name: "PHONE", uid: "phone" },
    { name: "MAIL", uid: "mail" },
    { name: "WEBSITE", uid: "website" },
    { name: "CATEGORY", uid: "category", sortable: true },
    { name: "PLAN", uid: "plan", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const planOptions = [
    { name: "Paid", uid: "paid" },
    { name: "Free", uid: "free" },
];

const INITIAL_VISIBLE_COLUMNS = ["business", "plan", "actions"];

export default function App() {
    // Fetch all listings from server
    const { data: listingsData, isLoading } = useListings();

    const [filterValue, setFilterValue] = React.useState("");

    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        if (listingsData && listingsData?.length > 0) {
            let filteredBusiness = [...listingsData!];

            if (hasSearchFilter) {
                filteredBusiness = filteredBusiness.filter((business) =>
                    business.business
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())
                );
            }
            if (
                statusFilter !== "all" &&
                Array.from(statusFilter).length !== planOptions.length
            ) {
                filteredBusiness = filteredBusiness.filter((business) =>
                    Array.from(statusFilter).includes(business.plan)
                );
            }

            return filteredBusiness;
        }
        return [];
    }, [listingsData, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Business, b: Business) => {
            const first = a[
                sortDescriptor.column as keyof Business
            ] as unknown as number;
            const second = b[
                sortDescriptor.column as keyof Business
            ] as unknown as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback(
        (business: Business, columnKey: React.Key) => {
            const cellValue = business[columnKey as keyof Business];

            switch (columnKey) {
                case "id":
                    return (
                        <p className="text-bold text-small capitalize">
                            {cellValue}
                        </p>
                    );
                case "business":
                    return <p className="font-semibold">{cellValue}</p>;
                case "plan":
                    return (
                        <Chip
                            className="uppercase"
                            classNames={{
                                content: "font-semibold text-xs",
                            }}
                            color={statusColorMap[business.plan]}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue}
                        </Chip>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center justify-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Eye size={20} />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Details</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Pencil size={20} />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit user</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <Trash2 size={20} />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete user</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        []
    );

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        value={filterValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    radius="sm"
                                    variant="flat"
                                    endContent={
                                        <ChevronDown
                                            size={20}
                                            className="mt-1"
                                        />
                                    }
                                >
                                    Plan
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {planOptions.map((plan) => (
                                    <DropdownItem
                                        key={plan.uid}
                                        className="capitalize"
                                    >
                                        {plan.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    radius="sm"
                                    variant="flat"
                                    endContent={
                                        <ChevronDown
                                            size={20}
                                            className="mt-1"
                                        />
                                    }
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <Button
                            as={Link}
                            to="/dashboard/listings/add"
                            color="primary"
                            radius="sm"
                            endContent={<Plus size={15} />}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {listingsData?.length} listings
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        listingsData?.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button
                        disabled={pages === 1}
                        size="sm"
                        className="font-medium"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={pages === 1}
                        size="sm"
                        className="font-medium"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        className={
                            column.uid === "actions" ? "text-center" : ""
                        }
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"No businesses found"}
                items={sortedItems}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
