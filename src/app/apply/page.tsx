import ApplyForm from './ApplyForm';
import { pageMetadata } from '@/lib/site';
export const metadata=pageMetadata({title:'درخواست مشاوره دوره فارکس و کوچینگ | همراه',description:'برای انتخاب دوره فارکس، مسیر تمرین یا کوچینگ، تجربه و نیاز خود را با همراه در میان بگذارید.',path:'/apply'});
export default async function Page({searchParams}:{searchParams:Promise<{offer?:string}>}){const {offer}=await searchParams;return <ApplyForm initialOffer={offer}/>}
