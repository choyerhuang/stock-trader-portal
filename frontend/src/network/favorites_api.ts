import { Favorite } from "../models/favorites";


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


export async function fetchFavorites(): Promise<Favorite[]> {
    const response = await fetchData("/favorite/", 
        {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Cache-Control" : "no-cache"
            }
        });
        return response.json();
}

export async function addFavorite(ticker: string) {
    const response = await fetchData("/favorite/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({companyStick: ticker}),
        }
    );
    return response.json();
}

export async function deleteFavorite(ticker: string) {
    const response = await fetchData("/favorite/" + ticker,
        {
            method: "DELETE"
        }
    );
}