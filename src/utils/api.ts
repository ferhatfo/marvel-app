import { CharacterDataWrapper } from '@/types/marvels';
import axios from 'axios';
import md5 from 'md5'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.NEXT_PUBLIC_API_PRIVATE_KEY;

const getTimeStamp = () => Date.now().toString();
const getHash = (timeStamp: string) => md5(timeStamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

const timeStamp = getTimeStamp();
const hash = getHash(timeStamp);
const query = `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

const handleResponse = async <T>(response: any) => {
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data.data as T;
}

export const getCharacters = async (page: number, pageSize: number): Promise<CharacterDataWrapper> => {
    const offset = (page - 1) * pageSize; 
    const url = `${API_BASE_URL}/characters?${query}&offset=${offset}&limit=${pageSize}`; 
    const response = await axios.get(url);
    return handleResponse<CharacterDataWrapper>(response);
}

export const detailCharacter = async (characterId: string): Promise<CharacterDataWrapper> => {
    const url = `${API_BASE_URL}/characters/${characterId}?${query}` 
    const response = await axios.get(url)
    return handleResponse<CharacterDataWrapper>(response)
}