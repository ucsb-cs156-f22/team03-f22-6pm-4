import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
//import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/helprequest",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function HelpRequestsTable({ helpRequests, currentUser }) {

    // const navigate = useNavigate();

    /* const editCallback = (cell) => {
        navigate(`/helprequests/edit/${cell.row.values.id}`)
    } */

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/helprequest/all"]
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
            Header: 'RequesterEmail',
            accessor: 'requesterEmail',
        },
        {
            Header: 'TeamID',
            accessor: 'teamId',
        },
        {
            Header: 'TableOrBreakoutRoom',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'RequestTime',
            accessor: 'requestTime',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Solved',
            id: 'solved',
            accessor: (row, _rowIndex) => String(row.solved)
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        //ButtonColumn("Edit", "primary", editCallback, "HelpRequestsTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "HelpRequestsTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={"HelpRequestsTable"}
    />;
};