
import { useState, useEffect, useRef } from 'react'
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Inventory() {
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleShow3 = () => setShow3(true);
  const handleClose3 = () => setShow3(false);
  const handleShow4 = () => setShow4(true);
  const handleClose4 = () => setShow4(false);
  
  const [file, setFile] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState([{}]);
  const [iprice, setiprice]= useState([{}]);
  const [dprice, setdprice]= useState([{}]);
  const [oos, setOos]=useState([{}]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:10000/mic/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };
  
const priceincrease=()=>{
 let iprice= updatedProduct.filter((up)=> ((up['Product Cost']).toFixed(2) < (up['Current Price']).toFixed(2) && up.quantity>4));
   setiprice(iprice);
   handleShow2();
}
const pricedecrease=()=>{
  let dprice= updatedProduct.filter((up)=> ((up['Product Cost']).toFixed(2) > (up['Current Price']).toFixed(2) && up.quantity>4));
  setiprice(dprice);
  handleShow3();
}

const outofstock=()=>{
  let oost= updatedProduct.filter((o)=>(o.quantity<6 && o.available==='T'));
  setOos(oost);
  handleShow4()
}
  // --------------------------------------------------------------------
  const [invfile, setInvFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);
  const [errorloading, seterrorLoading] = useState(false);
  const [links1, setLinks1] = useState([]);
  const [links2, setLinks2] = useState([]);
  const [links3, setLinks3] = useState([]);
  const [links4, setLinks4] = useState([]);
  const [links5, setLinks5] = useState([]);
  const [links6, setLinks6] = useState([]);
  const [links7, setLinks7] = useState([]);
  const [links8, setLinks8] = useState([]);
  const [errorlinks, seterrorLinks] = useState([]);
  const [customIndex, setCustomIndex] = useState(0);
  const [customIndex2, setCustomIndex2] = useState(0);
  const [customIndex3, setCustomIndex3] = useState(0);
  const [customIndex4, setCustomIndex4] = useState(0);
  const [customIndex5, setCustomIndex5] = useState(0);
  const [customIndex6, setCustomIndex6] = useState(0);
  const [customIndex7, setCustomIndex7] = useState(0);
  const [customIndex8, setCustomIndex8] = useState(0);
  const [errorcustomIndex, seterrorCustomIndex] = useState(0);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);
  const [index5, setIndex5] = useState(0);
  const [index6, setIndex6] = useState(0);
  const [index7, setIndex7] = useState(0);
  const [index8, setIndex8] = useState(0);
  const [errorindex, seterrorIndex] = useState(0);

  const [speed1, setSpeed1] = useState(0);
  const [speed2, setSpeed2] = useState(0);
  const [speed3, setSpeed3] = useState(0);
  const [speed4, setSpeed4] = useState(0);
  const [speed5, setSpeed5] = useState(0);
  const [speed6, setSpeed6] = useState(0);
  const [speed7, setSpeed7] = useState(0);
  const [speed8, setSpeed8] = useState(0);
  const [errorspeed, setSpeederror] = useState(0);

  const [totalProduct, setTotalProduct] = useState(0);
  const [urlError1, setUrlError1] = useState(false);
  const [urlError2, setUrlError2] = useState(false);
  const [urlError8, setUrlError8] = useState(false);
  const [urlError3, setUrlError3] = useState(false);
  const [urlError4, setUrlError4] = useState(false);
  const [urlError5, setUrlError5] = useState(false);
  const [urlError6, setUrlError6] = useState(false);
  const [urlError7, setUrlError7] = useState(false);
  const [errurlerr, setErrurlerr] = useState(false)
  const stopRef = useRef(false);
  const timerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    getinvurl();
    getserialnumber();
    geterrorurl()
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    stopTimer();
  };
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000); // Increment every second

  };
  const stopTimer = async () => {
    settime(timerRef.current)
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const formatElapsedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(1);
    return `${minutes} m ${seconds} s`;
  };
  const formatElapsedTime1 = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(0);
    return `${minutes} m ${seconds} s`;
  };
  const getserialnumber = async () => {
    let result = await fetch('http://localhost:10000/mic/getserialnumber', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    setIndex1(result.start_index1);
    setIndex2(result.start_index2);
    setIndex3(result.start_index3);
    setIndex4(result.start_index4);
    setIndex5(result.start_index5);
    setIndex6(result.start_index6);
    setIndex7(result.start_index7);
    setIndex8(result.start_index8);
    setElapsedTime(result.time);

  }


  const getinvurl = async () => {
    try {
      let result = await fetch('http://localhost:10000/mic/getinvurl', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      setLinks1(result.links1[0].url);
      setLinks2(result.links2[0].url);
      setLinks3(result.links3[0].url);
      setLinks4(result.links4[0].url);
      setLinks5(result.links5[0].url);
      setLinks6(result.links6[0].url);
      setLinks7(result.links7[0].url);
      setLinks8(result.links8[0].url);
    } catch (err) {
      console.log(err)
    }
  };
  const geterrorurl = async () => {
    try {
      let result = await fetch('http://localhost:10000/mic/geterrorurl', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      seterrorLinks(result.links);
    } catch (err) {
      console.log(err)
    }
  };
  // --------upload file for inventory update----
  const setInventoryfile = (e) => {
    setInvFile(e.target.files[0]);
  };

  const uploadinventoryfile = async (e) => {
    e.preventDefault();
   
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('file', invfile);
      const response = await axios.post('http://localhost:10000/mic/uploadinvfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.msg);
      window.location.reload();
      getinvproducts();
      setLoading(false)
    } catch(error) {
      console.error('Error uploading file:', error);
      setLoading(false)
      alert('Failed to upload file');
    }
  };
  const settime = (time) => {
    fetch('http://localhost:10000/mic/settime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: time + elapsedTime })
    })
  }
  // ------setIndex----
  const setindex = async () => {
    const newIndex = parseInt(customIndex, 10);
    let result = await fetch('http://localhost:10000/mic/setindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    if (result.status) {
      setIndex1(result.index);
    } else { setindex() }
  };
  const setindex2 = async () => {
    const newIndex = parseInt(customIndex2, 10);
    let result = await fetch('http://localhost:10000/mic/setindex2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex2();
    setIndex2(result.index)
  };
  const setindex3 = async () => {
    const newIndex = parseInt(customIndex3, 10);
    let result = await fetch('http://localhost:10000/mic/setindex3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex3();
    setIndex3(result.index)
  };
  const setindex4 = async () => {
    const newIndex = parseInt(customIndex4, 10);
    let result = await fetch('http://localhost:10000/mic/setindex4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex4();
    setIndex4(result.index)
  };
  const setindex5 = async () => {
    const newIndex = parseInt(customIndex5, 10);
    let result = await fetch('http://localhost:10000/mic/setindex5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex5();
    setIndex5(result.index)
  };
  const setindex6 = async () => {
    const newIndex = parseInt(customIndex6, 10);
    let result = await fetch('http://localhost:10000/mic/setindex6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex6();
    setIndex6(result.index)
  };
  const setindex7 = async () => {
    const newIndex = parseInt(customIndex7, 10);
    let result = await fetch('http://localhost:10000/mic/setindex7', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex7();
    setIndex7(result.index)
  };
  const setindex8 = async () => {
    const newIndex = parseInt(customIndex8, 10);
    let result = await fetch('http://localhost:10000/mic/setindex8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex8();
    setIndex8(result.index)
  };
  const seterrorindex = async () => {
    const newIndex = parseInt(errorcustomIndex, 10);
    let result = await fetch('http://localhost:10000/mic/seterrorindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : seterrorindex();
    seterrorIndex(result.index)
  };

  const autofetchData = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      setUrlError1(true);
      console.log("Error in autofetchData:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData2 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData2:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData3 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData3:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData4 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData4:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData5 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData5:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData6 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData6:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData7 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData7:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData8 = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData8:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchDataerror = async (link) => {
    try {
      let result = await fetch('http://localhost:10000/mic/autofetchdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      setErrurlerr(true);
      console.log("Error in autofetchData:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const setautoindex1 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex1();
    setIndex1(result.index)
  }
  const setautoindex2 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex2();
    setIndex2(result.index)
  }
  const setautoindex3 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex3();
    setIndex3(result.index)
  }
  const setautoindex4 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex4();
    setIndex4(result.index)
  }
  const setautoindex5 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex5();
    setIndex5(result.index)
  }

  const setautoindex6 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex6();
    setIndex6(result.index)
  }
  const setautoindex7 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex7', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex7();
    setIndex7(result.index)
  }

  const setautoindex8 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('http://localhost:10000/mic/setindex8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex8();
    setIndex8(result.index)
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const autofetch = async () => {
    let index = index1;
    setLoading1(true);
    startTimer();
    stopRef.current = false;
    while (index < links1.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData(links1[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed1(timeTaken1.toFixed(1));
        console.log(`Thread-I || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex1(index);
          setUrlError1(false)
        } else {
          setUrlError1(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
    setLoading1(false);
    stopTimer();
  };
  const autofetch2 = async () => {
    let index = index2;
    setLoading2(true);
    stopRef.current = false;
    while (index < links2.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData2(links2[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed2(timeTaken1.toFixed(1));
        console.log(`Thread-II || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex2(index)
          setUrlError2(false)
        } else {
          setUrlError2(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    } setLoading2(false)
  };
  const autofetch3 = async () => {
    let index = index3;
    setLoading3(true);
    stopRef.current = false;
    while (index < links3.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData3(links3[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed3(timeTaken1.toFixed(1));
        console.log(`Thread-III || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex3(index)
          setUrlError3(false)
        } else {
          setUrlError3(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    } setLoading3(false)
  };
  const autofetch4 = async () => {
    let index = index4;
    setLoading4(true);
    stopRef.current = false;
    while (index < links4.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData4(links4[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed4(timeTaken1.toFixed(1));
        console.log(`Thread-IV || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex4(index)
          setUrlError4(false)
        } else {
          setUrlError4(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    } setLoading4(false)
  };
  const autofetch5 = async () => {
    let index = index5;
    setLoading5(true);
    stopRef.current = false;
    while (index < links5.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData5(links5[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed5(timeTaken1.toFixed(1));
        console.log(`Thread-V || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex5(index)
          setUrlError5(false)
        } else {
          setUrlError5(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch5:", err);
      }
    } setLoading5(false)
  };

  const autofetch6 = async () => {
    let index = index6;
    setLoading6(true);
    stopRef.current = false;
    while (index < links6.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData6(links6[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed6(timeTaken1.toFixed(1));
        console.log(`Thread-VI || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex6(index)
          setUrlError6(false)
        } else {
          setUrlError6(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch6:", err);
      }
    } setLoading6(false)
  };

  const autofetch7 = async () => {
    let index = index7;
    setLoading7(true);
    stopRef.current = false;
    stopRef.current = false;
    while (index < links7.length && !stopRef.current) {
      try {
        const startTime = performance.now();
        const result = await autofetchData7(links7[index]);
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed7(timeTaken1.toFixed(1));
        console.log(`Thread-VII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex7(index)
          setUrlError7(false)
        } else {
          setUrlError7(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch7:", err);
      }
    } setLoading7(false)
  };

  const autofetch8 = async () => {
    let index = index8;
    setLoading8(true);
    stopRef.current = false;
    while (index < links8.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData8(links7[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed8(timeTaken1.toFixed(1));
        console.log(`Thread-VIII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex8(index)
          setUrlError8(false)
        } else {
          setUrlError8(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch8:", err);
      }
    } setLoading8(false)
  };
  const autofetcherror = async () => {
    let index = errorindex;
    seterrorLoading(true);
    startTimer();
    stopRef.current = false;
    while (index < errorlinks.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchDataerror(errorlinks[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeederror(timeTaken1.toFixed(1));
        console.log(`Thread-Error || error_index: ${errorindex} || result ${result}`);
        if (result === true) {
          index += 1;
          seterrorindex(index);
          setErrurlerr(false)
        } else {
          setErrurlerr(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
    seterrorLoading(false);
    stopTimer();
  };
  const stopFetching = () => {
    stopRef.current = true; // Set stop condition
  };

  const getupdatedproduct = async () => {

    let result = await fetch('http://localhost:10000/mic/getupdatedproduct', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    setUpdatedProduct(result);
    setTotalProduct(result.length);
    console.log(result.length);
    handleShow1();
  }
  const downloadInvontory = async () => {
    try {
      var ans;
      if (errorlinks.length > 0) {
        ans = confirm("There are some invalid or such a url where error occur. If you visited that then press ok neigher check those url and retry")
      }
      console.log(ans)
      if (!ans) { geterrorurl(); return; }
      if (ans === undefined || true) {
        setLoading(true)
        const response = await axios({
          url: 'http://localhost:10000/mic/download-inventory', // Replace with your backend URL
          method: 'GET',
          responseType: 'blob', // Important to get the response as a blob (binary data)
        });
        // Create a link element to trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Updated_inventory.xlsx'); // File name
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false)
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
      setLoading(false)
    }
  }

  const startall = () => {
    autofetch();
    autofetch2();
    autofetch3();
    autofetch4();
    autofetch5();
    autofetch6();
    autofetch7();
    autofetch8();
  }


  return (
    <>
      <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
        {loading && ( // Show spinner while loading is true
          <div className="loading-overlay">
            <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
          </div>
        )}
        <div>
          <h2>Inventory Updation</h2>
          <div>
            <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
            <button onClick={uploadinventoryfile} >Upload</button>
            <button onClick={startall} className='ms-4' >Start All</button>
            <button onClick={stopFetching} className='ms-4' disabled={!loading1}>
              Pause
            </button>
            <button className='ms-4 mt-4' variant="secondary" onClick={downloadInvontory}>
              Download Result
            </button>
            <Link className='ms-4' to='analysis'>Analysis Data</Link>

          </div>
        </div>
        <div className="timer_container mt-4">
          <div className='timer'>Elapsed Time : &nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime(elapsedTime)}</span></div>
          {
            (loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8) && <div className='timer'>Expected Time :&nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime1((speed1 / 8) * (links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8)))}</span> </div>
          }
          <div className="timer">
            Total updated Product : {totalProduct.length} <span onClick={getupdatedproduct}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg></span>
          </div>
        </div>
        <Accordion className='mt-4' defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Total Number of Product's URL: {links1 ? links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Total Number of urls fetched : {index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8} &nbsp;&nbsp; || &nbsp;&nbsp; Remaining urls :  {links1 ? links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8) : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Net Speed : &nbsp; <span style={{ color: 'red' }}> {(speed1 / 8).toFixed(1)} s / URL</span></Accordion.Header>
            <Accordion.Body>
              {/* --------first row of process */}
              <div className="container">

                <div className="row">
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch}>
                      Start-1
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index1}
                      onChange={(e) => setCustomIndex(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex}>
                      Set Index
                    </Button>
                    <div className="container mt-2">
                      <div className="row">
                        <div className="col-lg-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index1}/{links1.length}
                          </h4>
                          {loading1 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index1 / links1.length * 100)} text={`${(index1 / links1.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed1} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError1 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links1[index1]} target='_blank' style={{ color: urlError1 ? 'red' : '#1970ff' }}>{index1 === links1.length ? "Completed" : links1[index1]}</a>
                  </div>
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch2}>
                      Start-2
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index2}
                      onChange={(e) => setCustomIndex2(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex2}>
                      Set Index
                    </Button>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index2}/{links2.length}
                          </h4>
                          {loading2 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index2 / links2.length * 100)} text={`${(index2 / links2.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed2} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError2 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links2[index2]} target='_blank' style={{ color: urlError2 ? 'red' : '#1970ff' }}>{index2 === links2.length ? "Completed" : links2[index2]}</a>
                  </div>
                </div>
              </div>
              {/* -------------second row of process--- */}
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch3}>
                      Start-3
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index3}
                      onChange={(e) => setCustomIndex3(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex3}>
                      Set Index
                    </Button>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index3}/{links3.length}
                          </h4>
                          {loading3 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index3 / links3.length * 100)} text={`${(index3 / links3.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed3} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError1 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links3[index3]} target='_blank' style={{ color: urlError3 ? 'red' : '#1970ff' }}>{index3 === links3.length ? "Completed" : links3[index3]}</a>
                  </div>
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch4}>
                      Start-4
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index4}
                      onChange={(e) => setCustomIndex4(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex4}>
                      Set Index
                    </Button>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index4}/{links4.length}
                          </h4>
                          {loading4 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index4 / links4.length * 100)} text={`${(index4 / links4.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed4} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError4 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links4[index4]} target='_blank' style={{ color: urlError4 ? 'red' : '#1970ff' }}>{index4 === links4.length ? "Completed" : links4[index4]}</a>                </div>
                </div>
              </div>

              {/* ----------third row of process-------- */}
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch5}>
                      Start-5
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index5}
                      onChange={(e) => setCustomIndex5(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex5}>
                      Set Index
                    </Button>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index5}/{links5.length}
                          </h4>
                          {loading5 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index5 / links5.length * 100)} text={`${(index5 / links5.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed5} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError5 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links5[index5]} target='_blank' style={{ color: urlError5 ? 'red' : '#1970ff' }}>{index5 === links5.length ? "Completed" : links5[index5]}</a>                </div>
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch6}>
                      Start-6
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index6}
                      onChange={(e) => setCustomIndex6(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex6}>
                      Set Index
                    </Button>
                    <hr />
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index6}/{links6.length}
                          </h4>
                          {loading6 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index6 / links6.length * 100)} text={`${(index6 / links6.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed6} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError6 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links6[index6]} target='_blank' style={{ color: urlError6 ? 'red' : '#1970ff' }}>{index6 === links6.length ? "Completed" : links6[index6]}</a>                </div>
                </div>
              </div>

              {/* --------fourth row of process---------- */}
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch7}>
                      Start-7
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index7}
                      onChange={(e) => setCustomIndex7(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex7}>
                      Set Index
                    </Button>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <h4>
                            {index7}/{links7.length}
                          </h4>
                          {loading7 && (
                            <div className="loading-overlay ms-2">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <div style={{ height: 70, width: 70 }}>
                            <CircularProgressbar value={(index7 / links7.length * 100)} text={`${(index7 / links7.length * 100).toFixed(0)}%`} />;
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start align-items-center">
                          <h3>
                            {speed7} s / URL
                          </h3>
                        </div>
                      </div>
                    </div>
                    {urlError7 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links7[index7]} target='_blank' style={{ color: urlError7 ? 'red' : '#1970ff' }}>{index7 === links7.length ? "Completed" : links7[index7]}</a>                </div>
                  <div className="col-lg-6">
                    <Button variant="secondary" className='me-4' onClick={autofetch8}>
                      Start-8
                    </Button>
                    <input
                      type="number"
                      className='me-4 p-1'
                      style={{ width: '70px' }}
                      placeholder={index8}
                      onChange={(e) => setCustomIndex8(e.target.value)}
                    />

                    <Button variant="secondary" className='me-4' onClick={setindex8}>
                      Set Index
                    </Button>
                    <div className="col-lg-12">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <h4>
                              {index8}/{links8.length}
                            </h4>
                            {loading8 && (
                              <div className="loading-overlay ms-2">
                                <Spinner animation="border" variant="primary" />
                              </div>
                            )}
                          </div>
                          <div className="col-md-4 d-flex justify-content-center">
                            <div style={{ height: 70, width: 70 }}>
                              <CircularProgressbar value={(index8 / links8.length * 100)} text={`${(index8 / links8.length * 100).toFixed(0)}%`} />;
                            </div>
                          </div>
                          <div className="col-md-4 d-flex justify-content-start align-items-center">
                            <h3>
                              {speed8} s / URL
                            </h3>
                          </div>
                        </div>
                      </div>

                      {urlError8 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                      <a href={links8[index8]} target='_blank' style={{ color: urlError8 ? 'red' : '#1970ff' }}>{index8 === links8.length ? "Completed" : links8[index8]}</a>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {
            errorlinks.length > 0 &&
            <Accordion.Item eventKey="1">
              <Accordion.Header> <span style={{ color: 'red' }}>Number of url in which error occur: &nbsp; {errorlinks.length} </span> </Accordion.Header>
              <Accordion.Body>
                {/* --------first row of process */}
                <div className="container">

                  <div className="row">
                    <div className="col-lg-12">
                      <Button variant="secondary" className='me-4' onClick={autofetcherror}>
                        Retry
                      </Button>
                      <input
                        type="number"
                        className='me-4 p-1'
                        style={{ width: '70px' }}
                        placeholder={index2}
                        onChange={(e) => seterrorCustomIndex(e.target.value)}
                      />

                      <Button variant="secondary" className='me-4' onClick={seterrorindex}>
                        Set Index
                      </Button>


                      <div className="container mt-2">
                        <div className="row">
                          <div className="col-lg-4 d-flex justify-content-center align-items-center">
                            <h4>
                              {errorindex}/{errorlinks.length}
                            </h4>
                            {errorloading && (
                              <div className="loading-overlay ms-2">
                                <Spinner animation="border" variant="primary" />
                              </div>
                            )}
                          </div>
                          <div className="col-lg-4 d-flex justify-content-center">
                            <div style={{ height: 70, width: 70 }}>
                              <CircularProgressbar value={(errorindex / errorlinks.length * 100)} text={`${(errorindex / errorlinks.length * 100).toFixed(0)}%`} />;
                            </div>
                          </div>
                          <div className="col-lg-4 d-flex justify-content-start align-items-center">
                            <h3>
                              {errorspeed} s / URL
                            </h3>
                          </div>
                        </div>
                      </div>
                      {errurlerr && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                      <a href={errorlinks[errorindex]} target='_blank' style={{ color: errurlerr ? 'red' : '#1970ff' }}>{errorindex === errorlinks.length ? "Completed" : errorlinks[errorindex]}</a>
                      <hr />
                      <ol>
                        {
                          errorlinks.map((el) => (
                            <li><a href={el} target='_blank'>{el}</a></li>
                          ))
                        }
                      </ol>
                    </div>
                  </div>
                </div>

              </Accordion.Body>
            </Accordion.Item>
          }
        </Accordion>
        <hr />
        <Outlet />
      </div>

      <hr />
      <button onClick={getupdatedproduct}>See Comparison</button>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton className='d-flex justify-content-center'>
          <Modal.Title className='me-4 pe-4' style={{ borderRight: '3px solid black' }}>Latest Product Details</Modal.Title>
          <Modal.Title>Total Product : {updatedProduct.length}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table style={{width:'100%'}} striped bordered hover>
            <thead>
              <tr>

                <th>No</th>
                <th>Image</th>
                <th>UPC</th>
                <th>SKU</th>
                <th>Product Price</th>
                <th>Current Price</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Product URL</th>
              </tr>
            </thead>
            {updatedProduct.length > 0 && updatedProduct.map((detailArray, i) => (

              <tbody>

                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '0 !important' }}>
                    <img src={detailArray['Image link']} alt="" height='40px' />
                  </td>
                  <td>{detailArray.upc}</td>
                  <td>{detailArray.SKUs}</td>
                  <td>{detailArray['Product Cost']}</td>

                  <td style={{ color: Number(detailArray['Product Cost']) !== Number(detailArray['Current Price']) ? 'red' : 'black' }}>
                    {detailArray['Current Price']}
                  </td>

                  <td style={{ color: detailArray.quantity < 10 && detailArray.available == 'T' ? 'red' : 'black' }}>
                    {detailArray.quantity}
                  </td>
                  <td>{detailArray.available}</td>
                  <td> <a href={detailArray['Vendor URL']} target='_blank'>{detailArray['Vendor URL']}</a> </td>
                </tr>

              </tbody>

            ))}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <button onClick={priceincrease}>Increase Price</button>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton className='d-flex justify-content-center'>
          <Modal.Title className='me-4 pe-4' style={{ borderRight: '3px solid black' }}>Price Increase Details</Modal.Title>
          <Modal.Title>Total Product : {iprice.length}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table style={{width:'100%'}} striped bordered hover>
            <thead>
              <tr>

                <th>No</th>
                <th>Image</th>
                <th>UPC</th>
                <th>SKU</th>
                <th>Product Price</th>
                <th>Current Price</th>
                <th>Quantity</th>
                <th>Available</th>
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
                  <td>{detailArray.upc}</td>
                  <td>{detailArray.SKUs}</td>
                  <td>{detailArray['Product Cost']}</td>

                  <td style={{ color: Number(detailArray['Product Cost']) !== Number(detailArray['Current Price']) ? 'red' : 'black' }}>
                    {Number(detailArray['Current Price']).toFixed(2)}
                  </td>

                  <td style={{ color: detailArray.quantity < 10 && detailArray.available == 'T' ? 'red' : 'black' }}>
                    {detailArray.quantity}
                  </td>
                  <td>{detailArray.available}</td>
                  <td> <a href={detailArray['Vendor URL']} target='_blank'>{detailArray['Vendor URL']}</a> </td>
                </tr>

              </tbody>

            ))}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <button onClick={pricedecrease}>Decreased Price</button>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton className='d-flex justify-content-center'>
          <Modal.Title className='me-4 pe-4' style={{ borderRight: '3px solid black' }}>Price Decreased</Modal.Title>
          <Modal.Title>Total Product : {dprice.length}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table style={{width:'100%'}} striped bordered hover>
            <thead>
              <tr>

                <th>No</th>
                <th>Image</th>
                <th>UPC</th>
                <th>SKU</th>
                <th>Product Price</th>
                <th>Current Price</th>
                <th>Quantity</th>
                <th>Available</th>
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
                  <td>{detailArray.upc}</td>
                  <td>{detailArray.SKUs}</td>
                  <td>{detailArray['Product Cost']}</td>

                  <td style={{ color: (Number(detailArray['Product Cost']) !== Number(detailArray['Current Price']) && detailArray.available ==='T') ? 'red' : 'black' }}>
                    {Number(detailArray['Current Price']).toFixed(2)}
                  </td>

                  <td style={{ color: detailArray.quantity < 10 && detailArray.available == 'T' ? 'red' : 'black' }}>
                    {detailArray.quantity}
                  </td>
                  <td>{detailArray.available}</td>
                  <td> <a href={detailArray['Vendor URL']} target='_blank'>{detailArray['Vendor URL']}</a> </td>
                </tr>

              </tbody>

            ))}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <button onClick={outofstock}>Out of Stock Product</button>
      <Modal show={show4} onHide={handleClose4}>
        <Modal.Header closeButton className='d-flex justify-content-center'>
          <Modal.Title className='me-4 pe-4' style={{ borderRight: '3px solid black' }}>Out Of Stock Product</Modal.Title>
          <Modal.Title>Total Product : {oos.length}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table style={{width:'100%'}} striped bordered hover>
            <thead>
              <tr>

                <th>No</th>
                <th>Image</th>
                <th>UPC</th>
                <th>SKU</th>
                <th>Product Price</th>
                <th>Current Price</th>
                <th>Quantity</th>
                <th>Available</th>
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
                  <td>{detailArray.upc}</td>
                  <td>{detailArray.SKUs}</td>
                  <td>{detailArray['Product Cost']}</td>

                  <td style={{ color: (Number(detailArray['Product Cost']) !== Number(detailArray['Current Price']) && detailArray.available ==='T') ? 'red' : 'black' }}>
                    {Number(detailArray['Current Price']).toFixed(2)}
                  </td>

                  <td style={{ color: detailArray.quantity < 10 && detailArray.available == 'T' ? 'red' : 'black' }}>
                    {detailArray.quantity}
                  </td>
                  <td>{detailArray.available}</td>
                  <td> <a href={detailArray['Vendor URL']} target='_blank'>{detailArray['Vendor URL']}</a> </td>
                </tr>

              </tbody>

            ))}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default Inventory;
