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
									 Tengu - N??i cung c???p c??c s???n ph???m tranh ???nh ch???t l?????ng
								</span>
								<br/>
							
								<span 
								
								// th??m c??i id ????n h??ng ch??? n??y nha 
								
								className="invoice-number">M?? ????n h??ng: {detailOrder._id}</span> 
							</div>
							<br/>
							<br/>
							<div className="pdf-footer">
												
							</div>
							<div className="addresses">
								<div className="for">
									<h3>Ng?????i ?????t</h3>
									<Grid>
										<p>
										{detailOrder.customerId.lastName} <a> </a>
										{detailOrder.customerId.firstName}
										{/* t??n ng?????i mua */}
										</p>
										<p>
										{detailOrder.createdAt}
										{/* ng??y mua */}
										</p>

									</Grid>
								</div>

								<div className="from">
									<h3>Ng?????i nh???n</h3>
									<p>
									{detailOrder.customerName}
									</p>
										{/* t??n ng?????i nh???n */}
									<p>
									{detailOrder.address.ward}
									</p>
									{detailOrder.address.district}
									<p>
									{detailOrder.address.province}
									</p>
										{/* ?????a ch??? */}
										{/* s??? ??i???n tho???i li??n l???c */}
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
                      <TableCell width="40%">T??n tranh</TableCell>
                      <TableCell width="20%" align="right">
                        Gi?? ti???n
                      </TableCell>
                      <TableCell width="10%" align="right">
                        S??? l?????ng
                      </TableCell>
                      <TableCell width="20%" align="right">
                        T???ng c???ng
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
						{product.productId?.title}
							
							</TableCell>
                        <TableCell width="20%" align="right">
						{product.productId?.price}
                        </TableCell>
                        <TableCell width="10%" align="right">
                         
							{product.quantity}		
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {/* {TotalPrice(item.price, item.quantity)} */}
						  {product.quantity * product.productId?.price}
                        </TableCell>
                      </TableRow>
					  );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>


								<p className="signature">
									T???ng ti???n: {detailOrder.payableAmount > 800000 ? detailOrder.payableAmount : detailOrder.payableAmount + 30000} <br />
									Ph?? v???n chuy???n: {detailOrder.payableAmount > 800000 ? "FREE" : "30 000??"}<br/>
									_______________<br/>
									Th??nh gi??: {detailOrder.payableAmount}
								
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