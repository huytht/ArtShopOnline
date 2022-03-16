import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const getCustomersUrl = "https://tengu-nodejs.herokuapp.com/api/customer/";
  const token = localStorage.getItem("accessToken").toString();

  useEffect(() => {
    axios
      .get(getCustomersUrl, { headers: { token: token } })
      .then((response) => {
        setCustomers(response.data);
      }, []);
  });

  // const [tableData, setTableData] = useState([
  //     {name: "khach1", birthday:"23/10/2222", email:"abcd@gmail.com", phone:"0921213124", address: "33, binh tan, Ho Chi Minh", account:"user1", password:"12345" },
  //     {name: "khach2", birthday:"23/10/2222" ,email:"abcd@gmail.com", phone:"0921213124", address: "33, binh tan, Ho Chi Minh", account:"user1", password:"12345" },
  //     {name: "khach11", birthday:"23/10/2222" ,email:"abcd@gmail.com", phone:"0921213124", address: "33, binh tan, Ho Chi Minh", account:"user1", password:"12345" },
  //     {name: "khach31", birthday:"23/10/2222" ,email:"abcd@gmail.com", phone:"0921213124", address: "33, binh tan, Ho Chi Minh", account:"user1", password:"12345" },
  //   ])
  const columns = [
    { title: "Fisrt Name", field: "firstName"} ,
    { title: "Last Name", field: "lastName"} ,
    // { title: "Birthday", field: "birthday" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Total Oders", field: "total_orders" },
    { title: "Total Spending", field: "total_spending" },
    { title: "Address", field: "address" },
    // { title: "Account", field: "account" },
  ];

  return (
    <div className="col-12">
      <div className="card">
        <div className="card__body">
          <MaterialTable
            columns={columns}
            data={customers}
            
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
                disabled: rowData.name == null,
                // color:"primary"
              }),
              grouping: true,
              columnsButton: true,
              //rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
              rowStyle: { background: "#f5f5f5", height: "40px" },
              headerStyle: { background: "#33B0FF ", color: "#fff" },
              //headerStyle: { background: "#f44336",color:"#fff"}
            }}
            title="Customers Information"
          />
        </div>
      </div>
    </div>
  );
};

export default Customers;
