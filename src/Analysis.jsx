import { useEffect, useState } from "react"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

export default function Analysis() {
  const [data, setData] = useState([{}]);
  const [rowData, setRowData] = useState([{}]);
  const [iprice, setiPrice] = useState([{}]);
  const [dprice, setdPrice] = useState([{}]);
  const [oos, setOos] = useState([{}]);
  const [backup, setBackup]= useState([{}])
  useEffect(() => {
    getdata();
    getrowdata();
    getbackup();
  }, [])

  const getbackup= async()=>{
    let backup= await fetch('https://belk.onrender.com/analysis/getbackup',{
      method:'GET',
      headers:{'Content-Type':'application/json'}
    });
    backup= await backup.json();
    setBackup(backup);
  }

  const getdata = async () => {
    let data = await fetch('https://belk.onrender.com/analysis/getdata', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    data = await data.json();
    setData(data);
    const iprice = data.filter((d) => (Number(d['Product price']) < Number(d['Current Price'])));
    setiPrice(iprice)
    const dprice = data.filter((d) => (Number(d['Product price']) > Number(d['Current Price'])));
    setdPrice(dprice);
     const oos= data.filter((d)=>(d['Current Quantity']===0));
     setOos(oos)

  }

  const getrowdata = async () => {
    let data = await fetch('https://belk.onrender.com/analysis/getrowdata', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    data = await data.json();
    setRowData(data)
    console.log(data[0])
  }
  return (
    <div className="bg-dark ps-4 pe-4" style={{ marginTop: '-17px', paddingTop: '17px', minHeight:'700px' }}>
      <h1 className="fw mb-4 mt-4">Welcome to analysis page</h1>
      <Accordion  className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Total Number of Updated Products : &nbsp;&nbsp; <span style={{ color: 'blue' }}>{data.length > 1 ? data.length : 0} </span></Accordion.Header>
          <Accordion.Body>
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
              {data.length > 0 && data.map((detailArray, i) => (
                <tbody>

                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '0 !important' }}>
                      <img src={detailArray['Image link']} alt="" height='40px' />
                    </td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{detailArray['Product price']}</td>
                    <td>{detailArray['Current Price']}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>

                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Total Number of Uploaded Products :&nbsp;&nbsp; <span style={{ color: 'blue' }}>{rowData.length > 1 ? rowData.length : 0} </span> </Accordion.Header>
          <Accordion.Body>
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
              {data.length > 0 && data.map((detailArray, i) => (
                <tbody>

                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '0 !important' }}>
                      <img src={detailArray['Image link']} alt="" height='40px' />
                    </td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{detailArray['Product price']}</td>
                    <td>{detailArray['Current Price']}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>

                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        {/* ----------price increased products------- */}
        <Accordion.Item eventKey="2">
          <Accordion.Header> Products which price Increased : &nbsp;&nbsp; <span style={{ color: 'blue' }}>{iprice.length > 1 ? iprice.length : 0} </span></Accordion.Header>
          <Accordion.Body>
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
              {iprice.length > 0 && iprice.map((detailArray, i) => (
                <tbody>

                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '0 !important' }}>
                      <img src={detailArray['Image link']} alt="" height='40px' />
                    </td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{(Number(detailArray['Product price']).toFixed(2))}</td>
                    <td>{(Number(detailArray['Current Price'])).toFixed(2)}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>

                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        {/* ----------price increased products------- */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Products which price Decreased : {dprice[0].ASIN!== undefined ? dprice.length : 0}</Accordion.Header>
          <Accordion.Body>
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
              {dprice.length > 0 && dprice.map((detailArray, i) => (
                <tbody>

                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '0 !important' }}>
                      <img src={detailArray['Image link']} alt="" height='40px' />
                    </td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{(Number(detailArray['Product price']).toFixed(2))}</td>
                    <td>{(Number(detailArray['Current Price'])).toFixed(2)}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>

                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Out of stock Products : {oos[0].ASIN!== undefined ? oos.length : 0}</Accordion.Header>
          <Accordion.Body>
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
              {oos.length > 0 && oos.map((detailArray, i) => (
                <tbody>

                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '0 !important' }}>
                      <img src={detailArray['Image link']} alt="" height='40px' />
                    </td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{(Number(detailArray['Product price']).toFixed(2))}</td>
                    <td>{(Number(detailArray['Current Price'])).toFixed(2)}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>
                  </tr>

                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h1 className="fw mb-4 mt-4">Back Up Files</h1>

    </div>
  )
}