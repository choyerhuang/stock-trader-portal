

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

export async function SearchStock(sticker: string, type: string, open: boolean): Promise<any> {
    //type: abstract, price, news, polygon, autocomplete, recommendation, insider, peers, earnings
    const response = await fetchData("/search?name=" + sticker + "&type=" + type +"&open=" + open,
        {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Cache-Control" : "no-cache"
            }
        }); //should be modified after deploy
        return response.json();
}