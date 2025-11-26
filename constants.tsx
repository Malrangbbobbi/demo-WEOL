
import React from 'react';
import type { SDG } from './types';

const SvgWrapper: React.FC<{ children: React.ReactNode; viewBox?: string }> = ({ children, viewBox = "0 0 24 24", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} fill="currentColor" {...props}>
    {children}
  </svg>
);

const Goal1Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </SvgWrapper>
);
const Goal2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
    <path d="M17 19c0-1.66-1.34-3-3-3H4c-1.66 0-3 1.34-3 3v1h16v-1zM5 13.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S7.33 15 6.5 15 5 14.33 5 13.5zM12 6c-1.66 0-3 1.34-3 3v4h6V9c0-1.66-1.34-3-3-3z" fill="none" /> 
    <path d="M19 19V14C19 14 15 12 15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M12 3C8 3 8 7 8 7V13H16V7C16 7 16 3 12 3Z" />
  </SvgWrapper>
);
const Goal3Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </SvgWrapper>
);
const Goal4Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </SvgWrapper>
);
const Goal5Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
     <path d="M12 4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 9c2.67 0 8 1.34 8 4v3H4v-3c0-2.66 5.33-4 8-4z" opacity="0.5"/>
     <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.39 4.07 3.3 4.7.75 1.3 2.15 2.15 3.7 2.15 2.35 0 4.25-1.9 4.25-4.25C18.25 5.51 15.45 2 12 2zm1 11.75V15h2v2h-2v2h-2v-2H9v-2h2v-1.25c-1.92-.63-3.3-2.49-3.3-4.7 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.21-1.39 4.07-3.3 4.7z"/>
  </SvgWrapper>
);
const Goal6Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 2c0 0-8 8.89-8 13.13 0 3.93 3.06 7.37 7.02 7.82.52.06 1.13.04 1.78-.05 3.97-.56 7.2-4.13 7.2-8.3C20 9.8 12 2 12 2zm0 18c-2.76 0-5-2.24-5-5 0-1.63 2.26-6.16 5-9.67 2.74 3.51 5 8.04 5 9.67 0 2.76-2.24 5-5 5z"/>
  </SvgWrapper>
);
const Goal7Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V22h-2v4.25z"/>
  </SvgWrapper>
);
const Goal8Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </SvgWrapper>
);
const Goal9Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </SvgWrapper>
);
const Goal10Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M4 9h16v2H4zm0 4h16v2H4z"/>
    <rect x="8" y="4" width="8" height="2"/>
    <rect x="8" y="18" width="8" height="2"/>
  </SvgWrapper>
);
const Goal11Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M15 11V5l-3-3-3 3v2H2v11h20V11h-7zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
  </SvgWrapper>
);
const Goal12Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </SvgWrapper>
);
const Goal13Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M12 2c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-10h-2v5l4.25 2.5.75-1.23-3-1.77z"/>
  </SvgWrapper>
);
const Goal14Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M21.5 13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5 0c-.83 0-1.5-.67-1.5-1.5S15.67 10 16.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-7.5-3c-.83 0-1.5-.67-1.5-1.5S3.67 10 4.5 10 6 10.67 6 11.5 5.33 13 4.5 13zm-2 5c-.83 0-1.5-.67-1.5-1.5S1.67 15 2.5 15 4 15.67 4 16.5 3.33 18 2.5 18z"/>
  </SvgWrapper>
);
const Goal15Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-5-2V8h2V6h-2V4h-2v2H8v2h2v2c-2.21 0-4 1.79-4 4v6h2v-6c0-1.1.9-2 2-2h2zm-2 4v4h2v-4h-2z"/>
  </SvgWrapper>
);
const Goal16Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M20.2 16.6l-1.8 1.8c-.8.8-2 .8-2.8 0l-3.6-3.6c-.8-.8-.8-2 0-2.8l1.8-1.8L10 6.4 8.2 8.2c-.8.8-2 .8-2.8 0L1.8 4.6c-.8-.8-.8-2 0-2.8L4.6 0l15.6 15.6c.8.8.8 2 0 2.8z"/>
    <path d="M12.8 10.8l3.6 3.6 2.8-2.8-3.6-3.6z"/>
  </SvgWrapper>
);
const Goal17Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgWrapper {...props}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </SvgWrapper>
);


export const SDG_LIST: SDG[] = [
  { id: 1, code: "G01", title: "빈곤 종식", color: "#E5243B", icon: Goal1Icon },
  { id: 2, code: "G02", title: "기아 종식", color: "#DDA63A", icon: Goal2Icon },
  { id: 3, code: "G03", title: "건강과 웰빙", color: "#4C9F38", icon: Goal3Icon },
  { id: 4, code: "G04", title: "양질의 교육", color: "#C5192D", icon: Goal4Icon },
  { id: 5, code: "G05", title: "성평등", color: "#FF3A21", icon: Goal5Icon },
  { id: 6, code: "G06", title: "깨끗한 물과 위생", color: "#26BDE2", icon: Goal6Icon },
  { id: 7, code: "G07", title: "깨끗한 에너지", color: "#FCC30B", icon: Goal7Icon },
  { id: 8, code: "G08", title: "좋은 일자리와 경제 성장", color: "#A21942", icon: Goal8Icon },
  { id: 9, code: "G09", title: "산업, 혁신, 사회기반시설", color: "#FD6925", icon: Goal9Icon },
  { id: 10, code: "G10", title: "불평등 감소", color: "#DD1367", icon: Goal10Icon },
  { id: 11, code: "G11", title: "지속가능한 도시와 공동체", color: "#FD9D24", icon: Goal11Icon },
  { id: 12, code: "G12", title: "책임감 있는 소비와 생산", color: "#BF8B2E", icon: Goal12Icon },
  { id: 13, code: "G13", title: "기후변화 대응", color: "#3F7E44", icon: Goal13Icon },
  { id: 14, code: "G14", title: "해양 생태계 보존", color: "#0A97D9", icon: Goal14Icon },
  { id: 15, code: "G15", title: "육상 생태계 보존", color: "#56C02B", icon: Goal15Icon },
  { id: 16, code: "G16", title: "평화, 정의, 제도", color: "#00689D", icon: Goal16Icon },
  { id: 17, code: "G17", title: "지구촌 협력", color: "#19486A", icon: Goal17Icon },
];
