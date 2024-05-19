/**
 * This file contains a helper function that works on PHR data.
 * It is used to fetch data from the API.
 */

const API_URL = 'https://api-stg.altibb.com/active/v1/phrs/29313647';
const TOKEN = 'oYKqtcwsnenbEO_vmsdMkxF1KeRc71WR';

export const fetchPHRdata = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newPhrData = await response.json();
        console.log('PHR data:', newPhrData);
        return newPhrData;

    } catch (err) {
        console.error('PHR data error:', err);
        throw err;
    }
};