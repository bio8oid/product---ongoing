import { useState, useEffect } from "react";


const useFetch = (query, string) => {
console.log('string:', string)

    const [pageContent, setPageContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [routeFetchData, setRouteFetchData] = useState({});

    useEffect(() => {
        setRouteFetchData(string);
    }, [string]);

    const url = "http://localhost:8080/graphql";

    // const url = "https://cloud-estates.herokuapp.com/";

    
    useEffect(() => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const fetchData = async () => {
            try {
                let string = await `{${routeFetchData.name}: ${routeFetchData.value}}`;
                const body = JSON.stringify({ query, variables: { string } });
                const res = await fetch(url, { method: 'POST', headers: headers, body: body });
                const data = await res.json();
                setPageContent(data.data.properties);
                setLoading(false);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [routeFetchData, query]);
    return { pageContent, loading, routeFetchData };
};

export default useFetch;