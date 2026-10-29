import { ImageResponse } from 'next/og';
export const alt = 'همراه؛ آموزش فارکس، ژورنال و کوچینگ معامله‌گری';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'76px',background:'#f8f7f3',color:'#172b2b',fontFamily:'Arial'}}>
    <div style={{display:'flex',flexDirection:'column',gap:'28px',maxWidth:'690px'}}><div style={{display:'flex',fontSize:76,fontWeight:800,letterSpacing:'-4px'}}>HMB<span style={{color:'#77974c'}}>.</span></div><div style={{display:'flex',flexDirection:'column',fontSize:53,fontWeight:400,lineHeight:1.2,letterSpacing:'-2px'}}><span>THE PRACTICE</span><span>OF DECISION.</span></div><div style={{fontSize:18,color:'#64716b',letterSpacing:'3px'}}>LEARN. PRACTISE. REFLECT.</div><div style={{fontSize:22,color:'#64716b'}}>hamrah.me</div></div>
    <div style={{display:'flex',width:'350px',height:'430px',alignItems:'center',justifyContent:'center',borderRadius:'16px',background:'#192e24',border:'1px solid #43563b',transform:'rotate(-5deg)',boxShadow:'18px 24px 0 #e2e9d6'}}><div style={{display:'flex',flexDirection:'column',gap:'28px',padding:'32px',color:'#e8efd9'}}><span style={{fontSize:13,letterSpacing:'3px',color:'#d2f36b'}}>THE DECISION STUDIO</span><span style={{fontSize:34,lineHeight:1.4}}>A considered<br/>next step.</span>{[85,68,76].map((width,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:'12px'}}><span style={{width:'15px',height:'15px',border:'1px solid #a8ca65',borderRadius:'4px'}}/><span style={{height:'2px',width:width*2,background:'#718363'}}/></div>)}</div></div>
  </div>, size);
}
