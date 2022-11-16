import OurTable, { ButtonColumn } from "main/components/OurTable";
//import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


export default function ArticlesTable({ articles, currentUser }) {

    // Stryker disable all : hard to test for query caching
//    const deleteMutation = useBackendMutation(
//        cellToAxiosParamsDelete,
//        { onSuccess: onDeleteSuccess },
//        ["/api/articles/all"]
//    );
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
//    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

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
        ButtonColumn("Delete", "danger", "ArticlesTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={"ArticlesTable"}
    />;
};