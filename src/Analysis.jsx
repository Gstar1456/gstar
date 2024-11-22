import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

export default function Analysis() {
  const [data, setData] = useState([{}]);
  const [rowData, setRowData] = useState([{}]);
  const [realData, setRealData] = useState([{}])
  const [num, setNum] = useState(7)
  const [backupData, setBackupData] = useState([{}]);
  const [backup, setBackup] = useState([{}]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState([{}]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getdata();
    getrowdata();
    getbackup();

  }, [])


  const searchproduct = () => {
    setResult([{}])
    if (search !== null) {
      new Promise(resolve => setTimeout(resolve, 1000))
      const sr = realData.filter((d) => d.ASIN.toLowerCase().includes(search.toLowerCase()))
      setResult(sr);
    }
  }

  const cancelsearch = () => {
    setResult([{}]);
    setSearch(null)
  }

  const setbackupdata = (name) => {
    console.log(name);
    let bd = backup.filter((b) => b.name == name)
    setBackupData(bd[0].data);
    console.log(bd[0].data)
    handleShow()
  }
  const priceincrease = () => {
    const ip = realData.filter((d) => d['Current Price'] > d['Product price']);
    setData(ip)
  }

  const pricedecrease = () => {
    const ip = realData.filter((d) => d['Current Price'] < d['Product price']);
    setData(ip)
  }

  const outofstock = () => {
    const ip = realData.filter((d) => d['Current Quantity'] < num);
    setData(ip)
  }

  const all = () => {
    setData(realData)
  }

  const getbackup = async () => {
    console.log('get backup');
    let backup = await fetch('https://belk.onrender.com/analysis/getbackup/analysis/getbackup', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    backup = await backup.json();
    console.log(backup.length)
    setBackup(backup);
  }

  const getdata = async () => {
    let data = await fetch('https://belk.onrender.com/analysis/getbackup/analysis/getdata', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    data = await data.json();
    setData(data);
    setRealData(data);
  }

  const getrowdata = async () => {
    let data = await fetch('https://belk.onrender.com/analysis/getbackup/analysis/getrowdata', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    data = await data.json();
    setRowData(data)
    console.log(data[0])
  }

  // Pagination calculation for displaying the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate the page numbers to be displayed
  const paginationRange = () => {
    const range = [];
    const maxPageNumbers = 5; // Max page numbers to show
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="bg-dark ps-4 pe-4" style={{ marginTop: '-17px', paddingTop: '17px', minHeight: '1200px' }}>
      <h1 className="fw mb-4">Welcome to analysis page</h1>
      <Accordion className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Total Number of Updated Products : &nbsp;&nbsp; <span style={{ color: 'blue' }}>{data.length > 1 ? data.length : 0} </span></Accordion.Header>
          <Accordion.Body>

            <div className="d-flex mb-4  p-2 bg-primary text-white"> Filter Product :  <button onClick={all} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>All</button> <button onClick={priceincrease} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Price Increased</button>  <button onClick={pricedecrease} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Price Decrease</button>
              <button onClick={outofstock} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Out of Stock </button> <input onChange={(e) => setNum(e.target.value)} style={{ width: '40px' }} type="number" placeholder={num} /> <span className="ms-2 me-4">Which quantity is less than {num}</span>
              <div>
                <input type="text" value={search} style={{ width: '20vw' }} placeholder="Search Products by ASIN" onChange={(e) => { setSearch(e.target.value), searchproduct() }} />
                <svg onClick={cancelsearch} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="ms-2 mb-1 bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                
              </div>
              {
                  result.length > 0 && result[0].ASIN !== undefined &&
                  <div className="result">
                    <Table striped bordered hover className="bg-dark">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Input UPC</th>
                  <th>ASIN</th>
                  <th>SKU</th>
                  <th>Old Price</th>
                  <th>Current Price</th>
                  <th>Quantity</th>
                  <th>Product URL</th>
                </tr>
              </thead>
              <tbody>
                {result.length > 0 && result.map((detailArray, i) => (
                  <tr key={i}>
                    <td>{indexOfFirstItem + i + 1}</td>
                    <td><img src={detailArray['Image link']} alt="" height='40px' /></td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{detailArray['Product price']}</td>
                    <td>{detailArray['Current Price']}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>
                  </div>
                }
            </div>


            <Table striped bordered hover className="bg-dark">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Input UPC</th>
                  <th>ASIN</th>
                  <th>SKU</th>
                  <th>Old Price</th>
                  <th>Current Price</th>
                  <th>Quantity</th>
                  <th>Product URL</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 && currentItems.map((detailArray, i) => (
                  <tr key={i}>
                    <td>{indexOfFirstItem + i + 1}</td>
                    <td><img src={detailArray['Image link']} alt="" height='40px' /></td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{detailArray['Product price']}</td>
                    <td>{detailArray['Current Price']}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <Pagination>
              <Pagination.Prev onClick={() => handlePaginationClick(currentPage - 1)} disabled={currentPage === 1} />

              {/* Display page numbers with ellipses if needed */}
              {currentPage > 1 && <Pagination.Item onClick={() => handlePaginationClick(1)}>1</Pagination.Item>}
              {currentPage > 3 && <Pagination.Ellipsis />}
              {paginationRange().map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePaginationClick(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
              {currentPage < totalPages && <Pagination.Item onClick={() => handlePaginationClick(totalPages)}>{totalPages}</Pagination.Item>}

              <Pagination.Next onClick={() => handlePaginationClick(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
          </Accordion.Body>
        </Accordion.Item>
        {/* Repeat similar structure for other Accordions */}
      </Accordion>

      {/* Back Up Files Section */}
      <h1 className="fw mb-4 mt-4">Back Up Files</h1>
      <ul style={{ width: '49vw' }}>
        {
          backup.map((b) => (
            <li key={b._id} style={{ color: 'white' }} className="m-2">{b.name} - ({b.data ? b.data.length : 0} Products)  <button className="ms-4 p-0 ps-1 pe-1" onClick={() => setbackupdata(b.name)}>See details</button> <button className="ms-4 p-0 ps-1 pe-1 me-4">Download</button> <button className="p-0" style={{ backgroundColor: 'transparent' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1h-4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1l1 8a2.5 2.5 0 0 0 2.5 2h5a2.5 2.5 0 0 0 2.5-2l1-8h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-4z" />
              </svg>
            </button></li>
          ))
        }
      </ul>
      {/* Modal for Viewing Backup Data */}
      <Modal show={show} onHide={handleClose} className="mb-4">
        <Modal.Header closeButton>
          <Modal.Title>Back Up Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>UPC</th>
                <th>ASIN</th>
                <th>SKU</th>
                <th>Old Price</th>
                <th>Current Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {backupData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img src={item['Image link']} alt="" height='40px' /></td>
                  <td>{item['Input UPC']}</td>
                  <td>{item['ASIN']}</td>
                  <td>{item['SKU']}</td>
                  <td>{item['Product price']}</td>
                  <td>{item['Current Price']}</td>
                  <td>{item['Current Quantity']}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  )
}
