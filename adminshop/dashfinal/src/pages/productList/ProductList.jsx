import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteproduct, getproduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  
const dispatch=useDispatch()
const products=useSelector(state=>state.product.products)
useEffect(() => {
getproduct(dispatch)

}, [dispatch,products])

  const handleDelete = (id) => {
    deleteproduct(id,dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width:180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 130 },
    {
      field: "categories",
      headerName: "categories",
      headerName: "categories",
      width: 120,
    },
    {
      field: "size",
      headerName: "size",
      width: 120,
    },
    {
      field: "color",
      headerName: "color",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row)=>row?._id}
      />
    </div>
  );
}
