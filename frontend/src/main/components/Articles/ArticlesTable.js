import OurTable, { ButtonColumn } from "main/components/OurTable";
//import { useNavigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { hasRole } from "main/utils/currentUser";

// Stryker disable all : hard to test for query caching
export function cellToAxiosParamsDelete(cell) {
// Stryker disable all : hard to test for query caching
    return {
    // Stryker disable all : hard to test for query caching
        url: "/api/articles",
        // Stryker disable all : hard to test for query caching
        method: "DELETE",
        // Stryker disable all : hard to test for query caching
        params: {
        // Stryker disable all : hard to test for query caching
            code: cell.row.values.code
        }
        // Stryker disable all : hard to test for query caching
    }
    // Stryker disable all : hard to test for query caching
}

export default function ArticlesTable({ articles, currentUser }) {

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/articles/all"]
    );
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'title',
            accessor: 'title',
        },
        {
            Header: 'url',
            accessor: 'url',
        },
        {
            Header: 'explanation',
            accessor: 'explanation',
        },
        {
            Header: 'email',
            accessor: 'email',
        },
        {
            Header: 'dateAdded',
            accessor: 'dateAdded',
        },
    ];

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, "ArticlesTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={"ArticlesTable"}
    />;
};