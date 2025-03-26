import { Portfolio } from "../models/Portfolio";

async function fetchData(input: RequestInfo, init?:RequestInit) {
    const response = await fetch(input, init);

    if(response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchBudget() {
    const response = await fetchData("/budget", {method: "GET"});
    return response.json();
}

export async function addBudget(money: number) {
    const response = await fetchData("/budget/add",
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({budget: money}),
    });
    return response.json();
}

export async function minusBudget(money: number) {
    const response = await fetchData("/budget/minus",
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({budget: money}),        
    });
}

export async function fetchPortfolio(): Promise<Portfolio[]> {
    const response = await fetchData("/trade/",
        {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Cache-Control" : "no-cache"
            }
        });
    return response.json();
}

interface buySellProps {
    companyStick: string,
    stockPrice: number,
    amount: number,
    prevAmount: number,
    prevCost: number,
}

export async function buyStock(trade: buySellProps) {
    const response = await fetchData("/trade/buy",
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(trade),
    });
    await fetchData("/budget/minus",
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({budget: trade.stockPrice*trade.amount})              
    }
    )

    return response.json();
}

export async function sellStock(trade: buySellProps) {
    const response = await fetchData("/trade/sell",
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(trade),
    });
    await fetchData("/budget/add",
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({budget: trade.stockPrice*trade.amount})              
    }
    )

    return response.json();
}