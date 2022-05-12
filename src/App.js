import { useState, useEffect, useCallback } from "react";
import { AppBar, TextField } from "@mui/material";
import {
  Toolbar, Button, Typography, createTheme,
  ThemeProvider, Snackbar, Alert, Switch, FormGroup, Stack, Select, MenuItem,
} from "@mui/material";
import CurrencySVG from "./Currency.svg";
import tradeCard from "./tradeCard";
import TCardUser from "./TcardUser";
import Repeat from "./tradeCard";
import { LineChart } from "./graphLine";
import { DataGrid } from '@mui/x-data-grid';
import UserCredentialsDialog from "./UserCredentialsDialog";
import UserCredentialsDialogLogin from "./UserCredentialsDialogLogin";
import { getUserToken, saveUserToken, clearUserToken } from "./localStorage";
import TCard from "./Tcard";
import ChartUsd from "./chartUsdtoLbp";
import OfferDialog from "./offerDialog";
import('./App.css');



var SERVER_URL = "https://430L.ml"

function App() {
  const States = {
    PENDING: "PENDING",
    USER_CREATION: "USER_CREATION",
    USER_LOG_IN: "USER_LOG_IN",
    USER_AUTHENTICATED: "USER_AUTHENTICATED",
  };
  let [buyUsdRate, setBuyUsdRate] = useState("Not available yet");
  let [buy_fluct,setBuy_fluct] = useState("")
  let [sellUsdRate, setSellUsdRate] = useState("Not available yet");
  let [sell_fluct,setSell_fluct] = useState("")
  let [lbpInput, setLbpInput] = useState("");
  let [usdInput, setUsdInput] = useState("");
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);
  let [transactionType, setTransactionType] = useState("usd-to-lbp");
  let [userTransactions, setUserTransactions] = useState("");
  let [currency, setCurrency] = useState("Sell");
  let [toLBP, setToLBP] = useState(true);
  let [calculatorInput, setCalculatorInput] = useState("");

  let [start, setStart] = useState(true);
  let [home, setHome] = useState(true);
  let [trade, setTrade] = useState(false);
  let [info, setInfo] = useState(false);
  let [exchangeRatePage, setExchangeRatePage] = useState(false);
  let [calulatorPage, setCalculatorPage] = useState(false);
  let [accountPage, setAccountPage] = useState(false);
  let [statistics, setStatistics] = useState(false);
  let [graphusd_to_lbp, setGraphusd_to_lbp] = useState(true);
  let [USD1day, setUSD1day] = useState(true);
  let [USD5day, setUSD5day] = useState(false);
  let [USD30day, setUSD30day] = useState(false);
  let [LBP1day, setLBP1day] = useState(false);
  let [LBP5day, setLBP5day] = useState(false);
  let [LBP30day, setLBP30day] = useState(false);

  let [allOffers, setAllOffers] = useState("");
  let [listSellOffers, setlistSellOffers] = useState("");
  let [listBuyOffers, setlistBuyOffers] = useState("");
  let [userOffers, setUserOffers] = useState("");
  let [USDamount, setUSDAmount] = useState([]);
  let [LBPamount, setLBPAmount] = useState([]);
  let [sellOffers, setSellOffers] = useState(false);
  let [buyOffers, setBuyOffers] = useState(false);
  let [bothOffers, setBothOffers] = useState(true);
  let [addOffer,setAddOffer] = useState(false);

  let [dataGraph1day, setDataGraph1day] = useState([]);
  let [labelGraph1day, setLabelGraph1day] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]);
  let [dataGraph5day, setDataGraph5day] = useState([]);
  let [labelGraph5day, setLabelGraph5day] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121]);
  let [dataGraph1month, setDataGraph1month] = useState([]);
  let [labelGraph1month, setLabelGraph1month] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);

  let [dataLBPGraph1day, setDataLBPGraph1day] = useState([]);
  let [labelLBPGraph1day, setLabelLBPGraph1day] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]);
  let [dataLBPGraph5day, setDataLBPGraph5day] = useState([]);
  let [labelLBPGraph5day, setLabelLBPGraph5day] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121]);
  let [dataLBPGraph1month, setDataLBPGraph1month] = useState([]);
  let [labelLBPGraph1month, setLabelLBPGraph1month] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
  let [min1, setMin1] = useState("");
  let [max1, setMax1] = useState("");
  let [avg1, setAvg1] = useState("");
  let [min2, setMin2] = useState("");
  let [max2, setMax2] = useState("");
  let [avg2, setAvg2] = useState("");
  let [min3, setMin3] = useState("");
  let [max3, setMax3] = useState("");
  let [avg3, setAvg3] = useState("");
  let [min4, setMin4] = useState("");
  let [max4, setMax4] = useState("");
  let [avg4, setAvg4] = useState("");
  let [min5, setMin5] = useState("");
  let [max5, setMax5] = useState("");
  let [avg5, setAvg5] = useState("");
  let [min6, setMin6] = useState("");
  let [max6, setMax6] = useState("");
  let [avg6, setAvg6] = useState("");

  const interval = setInterval(function () {
    setStart(false);
  }, 1000);

  function getCalculatorOutput() {
    var rate = 0;
    if (toLBP && currency === "Sell") {
      rate = sellUsdRate;
    } else if (toLBP && currency === "Buy") {
      rate = buyUsdRate;
    } else if (!toLBP && currency === "Sell") {
      rate = 1 / sellUsdRate;
    } else {
      rate = 1 / buyUsdRate;
    }
    var calculatedAmount = calculatorInput * rate;
    return calculatedAmount.toFixed(2)
  }
  const output = getCalculatorOutput();

  function checkedState() {
    setToLBP(!toLBP);
  }

  function currencyChange(e) {
    setCurrency(e.target.value);
  }

  function computeCalculator(e) {
    setCalculatorInput(e.target.value);
    var amt = e.target.value;
  }

  function addItem() {
    var usd_to_lbp = true;
    if (transactionType === "usd-to-lbp") {
      if (usdInput === "" || lbpInput === "") {
        setUsdInput("");
        setLbpInput("");
        return;
      }
      usd_to_lbp = true;
    }
    if (transactionType === "lbp-to-usd") {
      if (usdInput === "" || lbpInput === "") {
        setUsdInput("");
        setLbpInput("");
        return;
      }
      usd_to_lbp = false;
    }
    if (userToken !== null) {
      postData(`${SERVER_URL}/transaction`, { usd_to_lbp: usd_to_lbp, usd_amount: usdInput, lbp_amount: lbpInput });
    } else {
      postDataNoUser(`${SERVER_URL}/transaction`, { usd_to_lbp: usd_to_lbp, usd_amount: usdInput, lbp_amount: lbpInput });
    }
    setUsdInput("");
    setLbpInput("");
    fetchRates();

  }

  function login(username, password) {
    return fetch(`${SERVER_URL}/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        setAuthState(States.USER_AUTHENTICATED);
        setUserToken(body.token);
        saveUserToken(body.token);
      });
  }

  function createUser(username, password, phone) {
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        phone: phone,
        password: password,
      }),
    }).then((response) => login(username, password));
  }

  function createOffer(usd_to_lbp,usd_amount, rate) {
    return fetch(`${SERVER_URL}/offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userToken
      },
      body: JSON.stringify({
        usd_to_lbp: usd_to_lbp,
        usd_amount: usd_amount,
        rate: rate,
      }),
    }).then((response) => getUserOffers())
  }

  function confOffer(id) {
    return fetch(`${SERVER_URL}/offer/close/confirm/${id}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
    }).then((response) => getUserOffers())
  }
  function cancelOffer(id) {
    return fetch(`${SERVER_URL}/offer/close/cancel/${id}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
    }).then((response) => getUserOffers())
  }
  

  function getUserOffers() {
    fetch(`${SERVER_URL}/offer/list/0/99999999`,{
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
    }).then(response => response.json())
      .then(data => {
        // console.log(data[0]);
        setUserOffers(data);
        // const tempselling = [];
        // const tempbuying = [];
        // let dLen = data.length;
        // for (let i = 0; i < dLen; i++) {
        //   if(data[i].usd_to_lbp){
        //     tempselling.push(data[i]);
        //   } else {
        //     tempbuying.push(data[i]);
        //   }
        // }
        // setlistSellOffers(tempselling);
        // setlistBuyOffers(tempbuying);
      });
  }

  function logout() {
    setUserToken(null);
    clearUserToken();
  }

  function fetchRates() {
    fetch(`${SERVER_URL}/exchangeRate`)
      .then(response => response.json())
      .then(data => {
        setSellUsdRate(data.usd_to_lbp.toString());
        setBuyUsdRate(data.lbp_to_usd.toString());
        setBuy_fluct(data.buy_fluct.toFixed(2).toString());
        setSell_fluct(data.sell_fluct.toFixed(2).toString());
      })
      // .catch((err) => {console.log(err) })
      ;
  }
  // useEffect(fetchRates, []);

  useEffect(fetchGraph_usd_to_lbp_1day, [start]);
  useEffect(fetchGraph_usd_to_lbp_5day, [start]);
  useEffect(fetchGraph_usd_to_lbp_30day, [start]);
  useEffect(fetchGraph_lbp_to_usd_1day, [start]);
  useEffect(fetchGraph_lbp_to_usd_5day, [start]);
  useEffect(fetchGraph_lbp_to_usd_30day, [start]);
  useEffect(getAllOffers, [start]);
  useEffect(getUserOffers, [start]);
  

  function getAllOffers() {
    fetch(`${SERVER_URL}/offer/list/0/99999999`)
      .then(response => response.json())
      .then(data => {
        // console.log(data[0]);
        setAllOffers(data);
        const tempselling = [];
        const tempbuying = [];
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          if(data[i].usd_to_lbp){
            tempselling.push(data[i]);
          } else {
            tempbuying.push(data[i]);
          }
        }
        setlistSellOffers(tempselling);
        setlistBuyOffers(tempbuying);
        
      });
  }

  function fetchGraph_usd_to_lbp_1day() {
    fetch(`${SERVER_URL}/graph/usd_to_lbp/1day`)
      .then(response => response.json())
      .then(data => {
        const tempdataGraph1day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          tempdataGraph1day[data[i][0]] = data[i][1];
        }
        setDataGraph1day(tempdataGraph1day);
        const min = Math.min.apply(null, tempdataGraph1day.filter(Boolean));
        const max = Math.max.apply(null, tempdataGraph1day);
        const Avg = tempdataGraph1day.reduce((a, b) => a + b) / tempdataGraph1day.length;
        setMin1(min);
        setMax1(max);
        setAvg1((Avg+20000).toFixed(2));
      })
      ;
  }

  function fetchGraph_usd_to_lbp_5day() {
    fetch(`${SERVER_URL}/graph/usd_to_lbp/5days`)
      .then(response => response.json())
      .then(data => {
        const tempdataGraph5day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          tempdataGraph5day[data[i][0]] = data[i][1];
        }
        setDataGraph5day(tempdataGraph5day);
        const min = Math.min.apply(null, tempdataGraph5day.filter(Boolean));
        const max = Math.max.apply(null, tempdataGraph5day);
        const Avg = tempdataGraph5day.reduce((a, b) => a + b) / tempdataGraph5day.length;
        setMin2(min);
        setMax2(max);
        setAvg2((Avg+20000).toFixed(2));
      })
      // .catch((err) => {console.log(err) })
      ;
  }

  function fetchGraph_usd_to_lbp_30day() {
    fetch(`${SERVER_URL}/graph/usd_to_lbp/30days`)
      .then(response => response.json())
      .then(data => {
        const tempdataGraph30day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          tempdataGraph30day[data[i][0]] = data[i][1];
        }
        setDataGraph1month(tempdataGraph30day);
        const min = Math.min.apply(null, tempdataGraph30day.filter(Boolean));
        const max = Math.max.apply(null, tempdataGraph30day);
        const Avg = tempdataGraph30day.reduce((a, b) => a + b) / tempdataGraph30day.length;
        setMin3(min);
        setMax3(max);
        setAvg3((Avg+20000).toFixed(2));
      })
      // .catch((err) => {console.log(err) })
      ;
  }

  function fetchGraph_lbp_to_usd_1day() {
    fetch(`${SERVER_URL}/graph/lbp_to_usd/1day`)
      .then(response => response.json())
      .then(data => {
        const tempdataLBPGraph1day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          tempdataLBPGraph1day[data[i][0]] = data[i][1];
        }
        setDataLBPGraph1day(tempdataLBPGraph1day);
        const min = Math.min.apply(null, tempdataLBPGraph1day.filter(Boolean));
        const max = Math.max.apply(null, tempdataLBPGraph1day);
        const Avg = tempdataLBPGraph1day.reduce((a, b) => a + b) / tempdataLBPGraph1day.length;
        setMin4(min);
        setMax4(max);
        setAvg4((Avg+20000).toFixed(2));
      })
      // .catch((err) => {console.log(err) })
      ;
  }

  function fetchGraph_lbp_to_usd_5day() {
    fetch(`${SERVER_URL}/graph/lbp_to_usd/5days`)
      .then(response => response.json())
      .then(data => {
        const tempdataLBPGraph5day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          tempdataLBPGraph5day[data[i][0]] = data[i][1];
        }
        setDataLBPGraph5day(tempdataLBPGraph5day);
        const min = Math.min.apply(null, tempdataLBPGraph5day.filter(Boolean));
        const max = Math.max.apply(null, tempdataLBPGraph5day);
        const Avg = tempdataLBPGraph5day.reduce((a, b) => a + b) / tempdataLBPGraph5day.length;
        setMin5(min);
        setMax5(max);
        setAvg5((Avg+20000).toFixed(2));
      })
      // .catch((err) => {console.log(err) })
      ;
  }

  function fetchGraph_lbp_to_usd_30day() {
    fetch(`${SERVER_URL}/graph/lbp_to_usd/30days`)
      .then(response => response.json())
      .then(data => {
        const tempdataLBPGraph30day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        let dLen = data.length;
        for (let i = 0; i < dLen; i++) {
          tempdataLBPGraph30day[data[i][0]] = data[i][1];
        }
        setDataLBPGraph1month(tempdataLBPGraph30day);
        const min6 = Math.min.apply(null, tempdataLBPGraph30day.filter(Boolean));
        const max6 = Math.max.apply(null, tempdataLBPGraph30day);
        const Avg6 = tempdataLBPGraph30day.reduce((a, b) => a + b) / tempdataLBPGraph30day.length;
        setMin6(min6);
        setMax6(max6);
        setAvg6((Avg6+20000).toFixed(2));
      })
      // .catch((err) => {console.log(err) })
      ;
  }

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {

      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  async function postDataNoUser(url = '', data = {}) {
    const response = await fetch(url, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const fetchUserTransactions = useCallback(() => {
    fetch(`${SERVER_URL}/transaction`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json()).then((transactions) => setUserTransactions(transactions));
  }, [userToken]);
  useEffect(() => {
    if (userToken) {
      fetchUserTransactions();
    }
  }, [fetchUserTransactions, userToken]);


  // const theme = createTheme({
  //   components: {
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //         },
  //       },
  //     },
  //   },
  // });

  const columns = [
    { field: 'usd_amount', headerName: 'USD Amount', width: 100 },
    {
      field: 'lbp_amount',
      headerName: 'LBP Amount',
      width: 100,
    },
    {
      field: 'usd_to_lbp',
      headerName: 'USD to LBP',
      width: 100,
    },
    {
      field: 'added_date',
      headerName: 'Added Date',
      width: 250,
    }
  ];



  const graphDatausd_to_lbp_1day = {
    labels: [...labelGraph1day],
    datasets: [
      {
        label: 'First Dataset',
        data: [...dataGraph1day],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      }
    ]
  };
  const graphDatausd_to_lbp_5day = {
    labels: [...labelGraph5day],
    datasets: [
      {
        label: 'First Dataset',
        data: [...dataGraph5day],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      }
    ]
  };
  const graphDatausd_to_lbp_30day = {
    labels: [...labelGraph1month],
    datasets: [
      {
        label: 'third Dataset',
        data: [...dataGraph1month],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      }
    ]
  };
  const graphDatalbp_to_usd_1day = {
    labels: [...labelLBPGraph1day],
    datasets: [
      {
        label: 'First Dataset',
        data: [...dataLBPGraph1day],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      }
    ]
  };
  const graphDatalbp_to_usd_5day = {
    labels: [...labelLBPGraph5day],
    datasets: [
      {
        label: 'First Dataset',
        data: [...dataLBPGraph5day],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      }
    ]
  };
  const graphDatalbp_to_usd_30day = {
    labels: [...labelLBPGraph1month],
    datasets: [
      {
        label: 'First Dataset',
        data: [...dataLBPGraph1month],
        fill: false,
        borderColor: '#42A5F5',
        tension: .4
      }
    ]
  };

  function getGraphUSD1day() {
    setUSD1day(true); setUSD5day(false); setUSD30day(false);
    setLBP1day(false); setLBP5day(false); setLBP30day(false);
  }
  function getGraphUSD5day() {
    setUSD1day(false); setUSD5day(true); setUSD30day(false);
    setLBP1day(false); setLBP5day(false); setLBP30day(false);
  }
  function getGraphUSD30day() {
    setUSD1day(false); setUSD5day(false); setUSD30day(true);
    setLBP1day(false); setLBP5day(false); setLBP30day(false);
  }
  function getGraphLBP1day() {
    setUSD1day(false); setUSD5day(false); setUSD30day(false);
    setLBP1day(true); setLBP5day(false); setLBP30day(false);
  }
  function getGraphLBP5day() {
    setUSD1day(false); setUSD5day(false); setUSD30day(false);
    setLBP1day(false); setLBP5day(true); setLBP30day(false);
  }
  function getGraphLBP30day() {
    setUSD1day(false); setUSD5day(false); setUSD30day(false);
    setLBP1day(false); setLBP5day(false); setLBP30day(true);
  }

  return (

    <div className="App">
      {start &&
        <div className="animation">
          <img className="img-animation" src={CurrencySVG}></img>
        </div>
      }
      {!start &&
        <AppBar position="static">
          <Toolbar classes={{ root: "nav-home" }}>
            <div>
              <Button className="btn-class" color="inherit" onClick={() => {
                setHome(true); setTrade(false); setInfo(false); setStatistics(false);
                setExchangeRatePage(false); setCalculatorPage(false); setAccountPage(false);
              }}>
                Home </Button>
              <Button className="btn-class" color="inherit" onClick={() => {
                setHome(false); setTrade(false); setInfo(false); setStatistics(false);
                setExchangeRatePage(true); setCalculatorPage(false); setAccountPage(false);
              }}>
                Rates </Button>
              <Button className="btn-class" color="inherit" onClick={() => {
                setHome(false); setTrade(false); setInfo(false); setStatistics(false);
                setExchangeRatePage(false); setCalculatorPage(true); setAccountPage(false);
              }}>
                Calculator </Button>
              <Button className="btn-class" color="inherit" onClick={() => {
                setHome(false); setTrade(true); setInfo(false); setStatistics(false);
                setExchangeRatePage(false); setCalculatorPage(false); setAccountPage(false);
              }}>
                Offers </Button>
              <Button className="btn-class" color="inherit" onClick={() => {
                setHome(false); setTrade(false); setInfo(true); setStatistics(false);
                setExchangeRatePage(false); setCalculatorPage(false); setAccountPage(false);
              }}>
                Statistics </Button>
            </div>
            {/* <Typography color="black" variant="h5">LBP exchange tracker</Typography> */}
            {userToken !== null ? (
              <div>
                <Button className="btn-class" color="inherit" onClick={() => {
                  setHome(false); setTrade(false); setInfo(false); setStatistics(false);
                  setExchangeRatePage(false); setCalculatorPage(false); setAccountPage(true);
                }}>
                  My account
                </Button>
                <Button className="btn-class" color="inherit" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button className="btn-class" color="inherit" onClick={() => setAuthState(States.USER_CREATION)}>
                  Register
                </Button>
                <Button className="btn-class" color="inherit" onClick={() => setAuthState(States.USER_LOG_IN)}>
                  Login </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      }
      <UserCredentialsDialog open={authState === States.USER_CREATION} onSubmit={(username, password, phone) => createUser(username, password, phone)}
        onClose={() => setAuthState(States.PENDING)}
        title={'Register'} submitText={'submit'}></UserCredentialsDialog>
      <UserCredentialsDialogLogin open={authState === States.USER_LOG_IN} onSubmit={(username, password) => login(username, password)}
        onClose={() => setAuthState(States.PENDING)}
        title={'Login'} submitText={'submit'}></UserCredentialsDialogLogin>
      <Snackbar
        elevation={6}
        variant="filled"
        open={authState === States.USER_AUTHENTICATED}
        autoHideDuration={2000}
        onClose={() => setAuthState(States.PENDING)}
      >
        <Alert severity="success">Success</Alert>
      </Snackbar>
      {!start && home &&
        <div className="App-home">

          <div className="home-page">
            <div className="home-text">
              <div className="home-text__container">
                <h1>LBP exchange Rate</h1>
                <p>Welcome to your currency exchange platform! Here, you can view the daily dollar rates, the periodic statistics,
                  your previous transactions, and much more!
                </p>
                {/* <Button className="grid-btn" variant="contained">Learn More</Button> */}
              </div>
            </div>
            <div className="home-img">
              <img className="img-class" src={CurrencySVG}></img>
            </div>
          </div>
        </div>
      }
      {!start && trade &&
        <div className="App">
          <div className="trade-buttons">
            <Button sx={{ backgroundColor: "#65AFC1" }} variant="contained" disabled={sellOffers}
              onClick={() => { setSellOffers(true); setBuyOffers(false); setBothOffers(false) }}>Selling Only</Button>
            <Button sx={{ backgroundColor: "#65AFC1" }} variant="contained" disabled={buyOffers}
              onClick={() => { setSellOffers(false); setBuyOffers(true); setBothOffers(false) }}>Buying Only</Button>
            <Button sx={{ backgroundColor: "#65AFC1" }} variant="contained" disabled={bothOffers}
              onClick={() => { setSellOffers(false); setBuyOffers(false); setBothOffers(true) }}>All offers</Button>
          </div>
          {bothOffers &&
            <Repeat numTimes={allOffers.length}>
              {(index) => <TCard className="card-type" USDamount={allOffers[index].usd_amount}
                rate={allOffers[index].rate}
                date={allOffers[index].added_date.substring(0, 10)}
                usd_to_lbp={allOffers[index].usd_to_lbp}
                phone={allOffers[index].phone}
                id={allOffers[index].id}
              ></TCard>}
            </Repeat>
          }
          {sellOffers &&
            <Repeat numTimes={listSellOffers.length}>
              {(index) => <TCard className="card-type" USDamount={listSellOffers[index].usd_amount}
                rate={listSellOffers[index].rate}
                date={listSellOffers[index].added_date.substring(0, 10)}
                usd_to_lbp={listSellOffers[index].usd_to_lbp}
                phone={listSellOffers[index].phone}
                id={listSellOffers[index].id}
              ></TCard>}
            </Repeat>
          }
          {buyOffers &&
            <Repeat numTimes={listBuyOffers.length}>
              {(index) => <TCard className="card-type" USDamount={listBuyOffers[index].usd_amount}
                rate={listBuyOffers[index].rate}
                date={listBuyOffers[index].added_date.substring(0, 10)}
                usd_to_lbp={listBuyOffers[index].usd_to_lbp}
                phone={listBuyOffers[index].phone}
                id={listBuyOffers[index].id}
              ></TCard>}
            </Repeat>
          }
        </div>
      }
      {!start && info &&
        <div className="App">
          <div className="info-page">
            <div className="info-buttons">
              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>LBP to USD</Typography>
                  <Switch defaultChecked onChange={() => { setGraphusd_to_lbp(!graphusd_to_lbp); if (!graphusd_to_lbp) { getGraphUSD1day() } else { getGraphLBP1day() } }} inputProps={{ 'aria-label': 'ant design' }} />
                  <Typography>USD to LBP</Typography>
                </Stack>
              </FormGroup>
              <Button sx={{ backgroundColor: "#65AFC1" }}
                variant="contained" onClick={() => graphusd_to_lbp ? getGraphUSD1day() : getGraphLBP1day()}>last day</Button>
              <Button sx={{ backgroundColor: "#65AFC1" }}
                variant="contained" onClick={() => graphusd_to_lbp ? getGraphUSD5day() : getGraphLBP5day()}>last 5 days</Button>
              <Button sx={{ backgroundColor: "#65AFC1" }}
                variant="contained" onClick={() => graphusd_to_lbp ? getGraphUSD30day() : getGraphLBP30day()}>past month</Button>
            </div>
            {USD1day && <ChartUsd data={graphDatausd_to_lbp_1day} min={min1} max={max1} average={avg1}></ChartUsd>}
            {USD5day && <ChartUsd data={graphDatausd_to_lbp_5day} min={min2} max={max2} average={avg2}></ChartUsd>}
            {USD30day && <ChartUsd data={graphDatausd_to_lbp_30day} min={min3} max={max3} average={avg3}></ChartUsd>}
            {LBP1day && <ChartUsd data={graphDatalbp_to_usd_1day} min={min4} max={max4} average={avg4}></ChartUsd>}
            {LBP5day && <ChartUsd data={graphDatalbp_to_usd_5day} min={min5} max={max5} average={avg5}></ChartUsd>}
            {LBP30day && <ChartUsd data={graphDatalbp_to_usd_30day} min={min6} max={max6} average={avg6}></ChartUsd>}
          </div>
        </div>
      }
      {!start && exchangeRatePage &&
        <div className="App">
          <div className="exchange-rate-page">
            <div className="exchange-rate-wrapper">

            <Typography variant="h3">Today's Exchange Rate</Typography>
              <p>LBP to USD Exchange Rate</p>
              <div className="rates-flex-row">
              <div className="fluct-buy">
              <Typography variant="h4">Buy USD: {buyUsdRate}</Typography>
              <Typography variant="h4">{buy_fluct}%</Typography>
              </div>
              <div className="fluct-class">
              <Typography variant="h4">Sell USD: {sellUsdRate}</Typography>
              <Typography variant="h4">{sell_fluct}%</Typography>
              </div>
              </div>
            </div>
            <div className="add-transactions-wrapper">
              <Typography variant="h4">Record a recent transaction</Typography>
              <form name="transaction-entry">
                <div className="add-transaction-flex">
                  <div>
                <div className="amount-input">
                  <label htmlFor="lbp-amount">LBP Amount</label>
                  <TextField
                    id="lbp-amount"
                    type={"number"}
                    value={lbpInput}
                    onChange={e => setLbpInput(e.target.value)}
                    variant="filled"></TextField>
                </div>
                <div className="amount-input">
                  <label htmlFor="usd-amount">USD Amount</label>
                  <TextField
                    id="usd-amount"
                    type={"number"}
                    value={usdInput}
                    onChange={e => setUsdInput(e.target.value)}
                    variant="filled"></TextField>
                </div>
                </div>
                <div className="type-selection">
                <Select
                  id="transaction-type"
                  value={transactionType}
                  onChange={e => setTransactionType(e.target.value)}
                >
                  <MenuItem value={"usd-to-lbp"}>USD to LBP</MenuItem>
                  <MenuItem value={"lbp-to-usd"}>LBP to USD</MenuItem>
                </Select> &nbsp;
                <Button sx={{ backgroundColor: "#65AFC1" }} variant="contained" onClick={addItem}>Add</Button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      }
      {!start && calulatorPage &&
        <div className="App">
          <div className="exchange-rate-page">
            <div className="exchange-rate-wrapper">

              <Typography variant="h3">Today's Exchange Rate</Typography>
              <p>LBP to USD Exchange Rate</p>
              <div className="rates-flex-row">
              <div className="fluct-buy">
              <Typography variant="h4">Buy USD: {buyUsdRate}</Typography>
              <Typography variant="h4">{buy_fluct}%</Typography>
              </div>
              <div className="fluct-class">
              <Typography variant="h4">Sell USD: {sellUsdRate}</Typography>
              <Typography variant="h4">{sell_fluct}%</Typography>
              </div>
              </div>
            </div>
            <div className="calculator-page">
              <Typography variant="h3">Calculator</Typography>
              <div className="amount-input">
                <label htmlFor="calc-amount">Amount to be computed</label>
                <TextField
                  id="calc-amount"
                  type={"number"}
                  value={calculatorInput}
                  onChange={e => computeCalculator(e)}
                  variant="filled"></TextField>
              </div>
              <div>
                <FormGroup>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>To USD</Typography>
                    <Switch defaultChecked onChange={checkedState} inputProps={{ 'aria-label': 'ant design' }} />
                    <Typography>To LBP</Typography>
                  </Stack>
                </FormGroup>
                <Select
                  id="currency"
                  value={currency}
                  onChange={e => currencyChange(e)}
                >
                  <MenuItem value={"Sell"}>Sell</MenuItem>
                  <MenuItem value={"Buy"}>Buy</MenuItem>
                </Select>
              </div>
              <Typography variant="h4">Equivalent Amount: {output}</Typography>
            </div>
          </div>
        </div>
      }
      {!start && statistics &&
        <div className="App">
          <div className="statistics-page">

          </div>
        </div>

      }
      {!start && userToken && accountPage && (
        <div className="App">
          <div className="account-page">
            <div className="wrapper">
              <Typography variant="h5">Your Transactions</Typography>
              <DataGrid
                columns={columns}
                rows={userTransactions}
                autoHeight
                disableSelectionOnClick
              />
            </div>
            <div className="my-offers">
              <Typography sx={{textAlignLast:"center"}}variant="h5">My offers</Typography>
              <Button sx={{width: 'fit-content',alignSelf:"center",backgroundColor:"#65AFC1"}} variant="contained" onClick={() => setAddOffer(true)}>Add Offer</Button>
              <Repeat numTimes={userOffers.length}>
              {(index) => <TCardUser className="card-type" USDamount={userOffers[index].usd_amount}
                rate={userOffers[index].rate}
                date={userOffers[index].added_date.substring(0, 10)}
                usd_to_lbp={userOffers[index].usd_to_lbp}
                phone={userOffers[index].phone}
                id={userOffers[index].id}
              ></TCardUser>}
            </Repeat>
            </div>
          </div>
        </div>
      )}
      <OfferDialog open={addOffer} onSubmit={(usd_to_lbp,usd_amount, rate) => {createOffer(usd_to_lbp,usd_amount, rate);setAddOffer(false)}}
        onClose={() => setAddOffer(false)}
        title={'Add offer'} submitText={'submit'}></OfferDialog>
    </div>
  );


}

export default App;
