import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Views from "../components/register/View";
import Controls from "../components/control/Controls";
import LayoutSample from "../components/Invoice/Invoice";

const Orders = () => {
  const getOrdersUrl = "https://tengu-nodejs.herokuapp.com/api/order/";
  const token = localStorage.getItem("accessToken").toString();

  const [detailOrder, setDetaiOrder] = useState({});
  console.log(detailOrder)

  const [openFormR, setOpenFormR] = useState(false);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(getOrdersUrl, { headers: { token: token } }).then((response) => {
      setOrders(response.data);
    });
  }, []);

  const columns = [
    // {title:"Order ID", field:"orderId"},
    {
      title: "Customer Name",

      render: (orders) => {
        return `${orders.customerId.firstName} ${orders.customerId.lastName}`;
      },
      field: "orders",
      sorting: false,
    },
    {
      title: "Receiver",
      field: "customerName",
      sorting: false,
    },
    {
      title: "Total Price",
      field: "payableAmount",
      align: "left",
      type: "currency",
      currencySetting: { currencyCode: "VND", minimumFractionDigits: 0 },
      editing: false,
    },

    {
      title: "Order Date",
      field: "createdAt",
      type: "date",
      // filtering: false,
      // sorting: false,
    },
    {
      title: "Updated Date",
      field: "updatedAt",
      type: "date",
      filtering: false,
      // sorting: false,
    },
    {
      title: "address",

      render: (orders) => {
        return `${orders.address.ward} , ${orders.address.district}, ${orders.address.province} `;
      },
      field: "orders",
      sorting: false,
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => (
        <div
          style={{
            background:
              rowData.status === "success" ? "#008000aa" : "#f90000aa",
            width: "100px",
            height: "30px",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            borderRadius: "4px",
            padding: 5,
          }}
        >
          {rowData.status === "pending" ? "pending" : "success"}
        </div>
      ),
      searchable: false,
      export: false,
    },
  ];

  return (
    <div className="col-12">
      <div className="card">
        <div className="card__body">
          <MaterialTable
            columns={columns}
            data={orders}
            editable={{
              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  // const updatedData = [...tableData];
                  // updatedData[oldRow.tableData.id] = newRow;
                  // setTableData(updatedData);
                  // setTimeout(() => resolve(), 500);
                  const updateOrderUrl =
                    "https://tengu-nodejs.herokuapp.com/api/order/" +
                    oldRow._id;
                  axios
                    .put(
                      updateOrderUrl,
                      {
                        status: "success",
                      },
                      { headers: { token: token } }
                    )
                    .then(() => {
                      setTimeout(() => resolve(), 500);
                    });
                }),
            }}
            actions={[
              {
                icon: () => (
                  <Controls.Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={() => setOpenFormR(true)}
                  />
                ),
                onClick: (e, data) => {setDetaiOrder(data)},
              },
            ]}
            onSelectionChange={(selectedRows) => console.log(selectedRows)}
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "right",
              searchAutoFocus: true,
              searchFieldVariant: "standard",
              filtering: true,
              paging: true,

              pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
              pageSize: 10,
              paginationType: "stepped",
              showFirstLastPageButtons: false,
              paginationPosition: "both",
              exportButton: true,
              //exportAllData: true,
              exportFileName: "TableData",
              addRowPosition: "first",
              actionsColumnIndex: -1,

              selection: false,
              showSelectAllCheckbox: false,
              showTextRowsSelected: false,
              selectionProps: (rowData) => ({
                disabled: rowData.status == null,
                // color:"primary"
              }),
              grouping: true,
              columnsButton: true,
              rowStyle: (data, index) =>
                index % 2 === 0 ? { background: "#f5f5f5" } : null,
              headerStyle: { background: "#33B0FF ", color: "#fff" },
            }}
            title="Orders"
            icons={{ Add: () => <AddIcon /> }}
          />

          <Views openFormR={openFormR} setOpenFormR={setOpenFormR}>
            <LayoutSample detailOrder={detailOrder} />
          </Views>
        </div>
      </div>
    </div>
  );
};

export default Orders;