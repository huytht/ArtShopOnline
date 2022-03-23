import '../Invoice/Invoice.css';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
// import { DropDownList } from '@progress/kendo-react-dropdowns';
import * as ReactDOM from "react-dom";
import * as React from 'react'


import logo from '../../assets/images/tengu.PNG'

import { useRef, useState, useEffect } from 'react';
import Controls from '../control/Controls';
import {
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
  } from "@mui/material";

import PageTemplate from './pagetemplate'

import Footer from './footer';
import { Grid } from '@material-ui/core';


const LayoutSample = ({detailOrder}) => {

	// const pdfExportComponent = useRef(null);
	
	const [layoutSelection, setLayoutSelection] = useState({ text: "A4", value: "size-a4"});
	
	console.log(detailOrder)
	// const ddData = [{ text: "A4", value: "size-a4" },
	//                 { text: "Letter", value: "size-letter" },
	// 								{ text: "Executive", value: "size-executive" }
	// 							 ];

	const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

	const updatePageLayout = (event) => {
		setLayoutSelection(event.target.value);
	}
	const pdfExportComponent = React.useRef(null);

  return(
    <div id="example">
			<div className="box wide hidden-on-narrow">
				<div className="box-col">
					{/* <h4>Select a Page Size</h4> */}
					{/* <DropDownList
							data={ddData}
							textField="text"
							dataItemKey="value"
							value={layoutSelection}
							onChange={updatePageLayout}
					>
					</DropDownList> */}
				</div>
				<div className="box-col">
					<h4>Export PDF</h4>
					<Controls.Button
						text="Export"
						onClick={handleExportWithComponent}
					
					/>
	    	  {/* <Button primary={true} onClick={handleExportWithComponent}>Export</Button> */}
				</div>
			</div>
			<div className="page-container hidden-on-narrow">
				<PDFExport forcePageBreak=".page-break"
				pageTemplate={PageTemplate}
				paperSize="A4"
				margin="2cm"
				ref={pdfExportComponent}>
					<div className={ `pdf-page ` }>
						<div className="inner-page">
							<div className="pdf-header">
								<span className="company-logo">

									<img style={{ width:"20%", height:"5%"}} src={logo} alt="Tengu Logo" />
									<br/>
									 Tengu - Nơi cung cấp các sản phẩm tranh ảnh chất lượng
								</span>
								<br/>
							
								<span 
								
								// thêm cái id đơn hàng chỗ này nha 
								
								className="invoice-number">Mã đơn hàng: {detailOrder._id}</span> 
							</div>
							<br/>
							<br/>
							<div className="pdf-footer">
												
							</div>
							<div className="addresses">
								<div className="for">
									<h3>Người đặt</h3>
									<Grid>
										<p>
										{detailOrder.customerId.lastName} <a> </a>
										{detailOrder.customerId.firstName}
										{/* tên người mua */}
										</p>
										<p>
										{detailOrder.createdAt}
										{/* ngày mua */}
										</p>

									</Grid>
								</div>

								<div className="from">
									<h3>Người nhận</h3>
									<p>
									{detailOrder.customerName}
									</p>
										{/* tên người nhận */}
									<p>
									{detailOrder.address.ward}
									</p>
									{detailOrder.address.district}
									<p>
									{detailOrder.address.province}
									</p>
										{/* địa chỉ */}
										{/* số điện thoại liên lạc */}
									<p>
									sdt: {detailOrder.phone}
									</p>
																	
									
								</div>
							</div>
							<br/>
							<br/>
							<div>
								
			<TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
					  <TableCell width="10%">STT</TableCell>	
                      <TableCell width="40%">Tên tranh</TableCell>
                      <TableCell width="20%" align="right">
                        Giá tiền
                      </TableCell>
                      <TableCell width="10%" align="right">
                        Số lượng
                      </TableCell>
                      <TableCell width="20%" align="right">
                        Tổng cộng
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
				  {detailOrder.products.map((product, idx) =>{
					  return (
                      <TableRow  key={idx}>
						  <TableCell width="10%" align="right">
						  {idx + 1}								
						 </TableCell>
                        <TableCell width="40%">
						{product.productId.title}
							
							</TableCell>
                        <TableCell width="20%" align="right">
						{product.productId.price}
                        </TableCell>
                        <TableCell width="10%" align="right">
                         
							{product.quantity}		
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {/* {TotalPrice(item.price, item.quantity)} */}
						  {product.quantity * product.productId.price}
                        </TableCell>
                      </TableRow>
					  );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>


								<p className="signature">
									Tổng tiền: {detailOrder.payableAmount > 800000 ? detailOrder.payableAmount : detailOrder.payableAmount + 30000} <br />
									Phí vận chuyển: {detailOrder.payableAmount > 800000 ? "FREE" : "30 000đ"}<br/>
									_______________<br/>
									Thành giá: {detailOrder.payableAmount}
								
								</p>
								<br/>
								<br/>
								<br/>
								<br/> 
								<Footer/>	
								<br/>
								<br/>
							</div>
							<div className="pdf-body">
								<div id="grid"></div>
								
							</div>

						</div>
					</div>
				</PDFExport>
			</div>
		</div>
  );
  

}


export default LayoutSample;