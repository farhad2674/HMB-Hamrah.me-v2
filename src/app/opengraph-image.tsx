import { ImageResponse } from 'next/og';

export const alt = 'همراه؛ آموزش فارکس، تمرین و کوچینگ';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'76px',background:'#f8f7f3',color:'#172b2b',fontFamily:'Arial'}}>
    <div style={{display:'flex',flexDirection:'column',gap:'24px',maxWidth:'720px'}}><div style={{display:'flex',fontSize:88,fontWeight:800,letterSpacing:'-5px'}}>HMB<span style={{color:'#6f873f'}}>.</span></div><div style={{display:'flex',flexDirection:'column',fontSize:48,fontWeight:700,lineHeight:1.35}}><span>FOREX LEARNING</span><span>PRACTICE &amp; FEEDBACK</span></div><div style={{fontSize:22,color:'#64716b'}}>hamrah.me</div></div>
    <div style={{width:'330px',height:'430px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'52px',background:'#d2f36b',border:'4px solid #172b2b',boxShadow:'22px 22px 0 #dedfd5'}}><div style={{width:'210px',height:'280px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'24px',background:'#fff',border:'4px solid #172b2b',fontSize:92,fontWeight:800}}>01</div></div>
  </div>, size);
}
