"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockData = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
function isOpenOrClose(timestamp) {
    const date = new Date(timestamp);
    const hourInLosAngeles = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'America/Los_Angeles'
    }).format(date);
    const hourNumeric = Number(hourInLosAngeles);
    return hourNumeric >= 13;
}
function formatDateToPST(date) {
    let currentDate = new Date(date);
    const options = {
        timeZone: 'America/Los_Angeles',
    };
    const currentDateString = currentDate.toLocaleDateString('en-US', options);
    const year = currentDateString.substring(5, 9);
    let month = currentDateString.substring(0, 1);
    if (month.length === 1) {
        month = "0" + month;
    }
    const day = currentDateString.substring(2, 4);
    return year + "-" + month + "-" + day;
}
function getPreviousWorkDate(currentDate, minusDay) {
    let date = new Date(currentDate);
    date.setDate(date.getDate() - minusDay);
    while (date.getDay() === 0 || date.getDay() === 6) {
        date.setDate(date.getDate() - 1);
    }
    return date;
}
function isFromDayValid(fromDateStamp, totimestamp) {
    if (fromDateStamp === totimestamp) {
        const newTimestamp = new Date(fromDateStamp);
        newTimestamp.setDate(newTimestamp.getDate() - 1);
        return formatDateToPST(newTimestamp);
    }
    else {
        return fromDateStamp;
    }
}
function getPreviousWorkDateURL(currentDate, isMarketOpen, polygon_KEY) {
    let fromtimestamp;
    let minusDay = 1;
    let totimestamp;
    let apiURL;
    if (isMarketOpen === "true") {
        fromtimestamp = formatDateToPST(getPreviousWorkDate(currentDate, minusDay));
        totimestamp = formatDateToPST(new Date());
        fromtimestamp = isFromDayValid(fromtimestamp, totimestamp);
        apiURL = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/hour/" + fromtimestamp + "/" + totimestamp + "?adjusted=true&sort=asc&apiKey=" + polygon_KEY;
    }
    else {
        if (isOpenOrClose(currentDate)) {
            fromtimestamp = formatDateToPST(getPreviousWorkDate(currentDate, minusDay));
            totimestamp = formatDateToPST(new Date());
            fromtimestamp = isFromDayValid(fromtimestamp, totimestamp);
            apiURL = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/hour/" + fromtimestamp + "/" + totimestamp + "?adjusted=true&sort=asc&apiKey=" + polygon_KEY;
        }
        else {
            minusDay = 2;
            fromtimestamp = formatDateToPST(getPreviousWorkDate(currentDate, 2));
            totimestamp = formatDateToPST(getPreviousWorkDate(currentDate, 1));
            fromtimestamp = isFromDayValid(fromtimestamp, totimestamp);
            apiURL = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/hour/" + fromtimestamp + "/" + totimestamp + "?adjusted=true&sort=asc&apiKey=" + polygon_KEY;
        }
    }
    return apiURL;
}
const getStockData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const isMarketOpen = req.query.open;
        if (!name) {
            throw (0, http_errors_1.default)(400, "Company name required.");
        }
        if (!isMarketOpen) {
            throw (0, http_errors_1.default)(400, "isMarketOpen name required.");
        }
        const requestType = req.query.type;
        if (!requestType) {
            throw (0, http_errors_1.default)(400, "Request Type required.");
        }
        const API_KEY = validateEnv_1.default.FINNHUB_KEY;
        let finnhub_origin;
        let apiUrl;
        let currentDateTrans;
        if (requestType === "abstract") {
            finnhub_origin = "https://finnhub.io/api/v1/stock/profile2?symbol=";
            apiUrl = `${finnhub_origin}${name}&token=${API_KEY}`;
        }
        else if (requestType === "price") {
            finnhub_origin = "https://finnhub.io/api/v1/quote?symbol=";
            apiUrl = `${finnhub_origin}${name}&token=${API_KEY}`;
        }
        else if (requestType === "news") {
            const { format, subDays } = require("date-fns");
            const currentDate = new Date();
            const today = format(currentDate, "yyyy-MM-dd");
            const t30daysAgo = format(subDays(currentDate, 30), 'yyyy-MM-dd');
            finnhub_origin = "https://finnhub.io/api/v1/company-news?symbol=";
            apiUrl = `${finnhub_origin}${name}&from=${t30daysAgo}&to=${today}&token=${API_KEY}`;
        }
        else if (requestType === "polygon") {
            const polygon_KEY = validateEnv_1.default.POLYGON_KEY;
            const { format, addMonths } = require("date-fns");
            const currentDate = new Date();
            const startDate = addMonths(new Date(), -24);
            currentDateTrans = format(currentDate, "yyyy-MM-dd");
            const startDateTrans = format(startDate, "yyyy-MM-dd");
            const polygon_URL = "https://api.polygon.io/v2/aggs/ticker/";
            apiUrl = `${polygon_URL}${name}/range/1/day/${startDateTrans}/${currentDateTrans}?adjusted=true&sort=asc&apiKey=${polygon_KEY}`;
        }
        else if (requestType === "hourlyVariant") {
            const polygon_KEY = validateEnv_1.default.POLYGON_KEY;
            const currentDate = new Date();
            apiUrl = getPreviousWorkDateURL(currentDate, isMarketOpen, polygon_KEY);
        }
        else if (requestType === "autocomplete") {
            finnhub_origin = "https://finnhub.io/api/v1/search?q=";
            apiUrl = `${finnhub_origin}${name}&token=${API_KEY}`;
        }
        else if (requestType === "recommendation") {
            finnhub_origin = "https://finnhub.io/api/v1/stock/recommendation?symbol=";
            apiUrl = `${finnhub_origin}${name}&from2022-01-01&token=${API_KEY}`;
        }
        else if (requestType === "insider") {
            finnhub_origin = "https://finnhub.io/api/v1/stock/insider-sentiment?symbol=";
            apiUrl = `${finnhub_origin}${name}&token=${API_KEY}`;
        }
        else if (requestType === "peers") {
            finnhub_origin = "https://finnhub.io/api/v1/stock/peers?symbol=";
            apiUrl = `${finnhub_origin}${name}&token=${API_KEY}`;
        }
        else if (requestType === "earnings") {
            finnhub_origin = "https://finnhub.io/api/v1/stock/earnings?symbol=";
            apiUrl = `${finnhub_origin}${name}&token=${API_KEY}`;
        }
        else {
            throw (0, http_errors_1.default)(400, "Invalid request type.");
        }
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw (0, http_errors_1.default)(500, "Failed to fetch data from the API.");
        }
        let data = yield response.json();
        if (requestType === "polygon") {
            const raw_data = data.results;
            const priceList = [];
            const volumeList = [];
            for (const item of raw_data) {
                priceList.push([item.t, item.o, item.h, item.l, item.c]);
                volumeList.push([item.t, item.v]);
            }
            data = { priceList: priceList,
                volumeList: volumeList,
                sticker: name,
                time: currentDateTrans };
        }
        if (requestType === "insider") {
            const raw_data = data.data;
            let positiveChange = 0;
            let positiveMSPR = 0;
            let negativeChange = 0;
            let negativeMSPR = 0;
            for (const item of raw_data) {
                if (item.change > 0) {
                    positiveChange += item.change;
                }
                else {
                    negativeChange += item.change;
                }
                if (item.mspr > 0) {
                    positiveMSPR += item.mspr;
                }
                else {
                    negativeMSPR += item.mspr;
                }
            }
            let totalChange = positiveChange + negativeChange;
            let totalMSPR = positiveMSPR + negativeMSPR;
            data = { "positiveChange": positiveChange, "negativeChange": negativeChange,
                "positiveMSPR": positiveMSPR, "negativeMSPR": negativeMSPR,
                "totalChange": totalChange, "totalMSPR": totalMSPR };
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.getStockData = getStockData;
