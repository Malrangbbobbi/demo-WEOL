
import React, { useEffect, useState, useRef } from 'react';
import { generateCompanyVideo } from '../services/geminiService';
import type { CompanyRecommendation } from '../types';

interface CompanyIntroVideoProps {
  company: CompanyRecommendation;
  onComplete: () => void;
}

const loadingMessages = [
  "ESG 활동 시나리오를 작성하고 있습니다...",
  "AI 감독이 영상을 연출하고 있습니다...",
  "지속가능한 미래를 그리고 있습니다...",
  "Cinematic 렌더링을 진행 중입니다...",
  "곧 영상이 시작됩니다..."
];

const CompanyIntroVideo: React.FC<CompanyIntroVideoProps> = ({ company, onComplete }) => {
  // Start directly in 'generating' (loading) state
  const [status, setStatus] = useState<'generating' | 'waiting-for-key' | 'playing'>('generating');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Cycle loading messages
  useEffect(() => {
    if (status === 'generating') {
      const interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Initial Check
  useEffect(() => {
    checkApiKeyAndStart();
  }, []);

  const checkApiKeyAndStart = async () => {
    try {
      const aiStudio = (window as any).aistudio;
      
      let hasKey = false;
      if (aiStudio && typeof aiStudio.hasSelectedApiKey === 'function') {
         hasKey = await aiStudio.hasSelectedApiKey();
      }
      
      if (!hasKey) {
        // If no key, show the button inside the loading screen
        setStatus('waiting-for-key');
      } else {
        // If key exists, start immediately
        startGeneration();
      }
    } catch (e) {
      console.error("Key check failed", e);
      // Fallback: try generating anyway
      startGeneration();
    }
  };

  const handleSelectKey = async () => {
    try {
      const aiStudio = (window as any).aistudio;
      if (aiStudio && typeof aiStudio.openSelectKey === 'function') {
        await aiStudio.openSelectKey();
      }
      // Assuming success, retry generation immediately
      startGeneration();
    } catch (e) {
      console.error("Selection failed", e);
      setErrorMsg("API 키 선택 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const startGeneration = async () => {
    setStatus('generating');
    setErrorMsg(null);

    try {
      const url = await generateCompanyVideo(company.image_reference_sentence, company.corp_name);
      if (url) {
        setVideoUrl(url);
        setStatus('playing');
      } else {
        throw new Error("Video generation returned null");
      }
    } catch (e: any) {
      console.error("Video Generation Error", e);
      if (e.message && e.message.includes("Requested entity was not found")) {
         // Token issue potentially
         setErrorMsg("API 키 인증이 필요합니다.");
         setStatus('waiting-for-key');
      } else {
         // Generic error, skip video to avoid stuck screen
         console.warn("Skipping video due to error");
         onComplete();
      }
    }
  };

  // Common Loading Background
  const renderBackground = () => (
    <div className="absolute inset-0 bg-black">
         <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover opacity-30 filter blur-sm animate-pulse"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
    </div>
  );

  if (status === 'waiting-for-key') {
    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center text-white">
          {renderBackground()}
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AI 영상 생성 준비
            </h2>
            <p className="text-gray-300 mb-8">
              Veo 모델을 사용하여 {company.corp_name}의 활동을 영상으로 제작합니다.<br/>
              계속하려면 API Key가 필요합니다.
            </p>
            
            <button
              onClick={handleSelectKey}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 mb-4"
            >
              API Key 선택하고 시작하기
            </button>
            
            <button
              onClick={onComplete}
              className="text-gray-500 hover:text-white text-sm underline transition-colors"
            >
              영상 없이 바로 상세 정보 보기
            </button>
            
            {errorMsg && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}
          </div>
        </div>
      );
  }

  if (status === 'generating') {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center text-white">
        {renderBackground()}
        <div className="relative z-10 flex flex-col items-center text-center p-6">
          <div className="w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-8 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          
          <h2 className="text-3xl font-light mb-3 tracking-wide">{company.corp_name}</h2>
          <p className="text-xl font-medium animate-pulse text-blue-300 h-8">
            {loadingMessages[loadingMsgIndex]}
          </p>
          <p className="text-gray-500 text-sm mt-8 max-w-sm">
            Veo AI가 기업의 ESG 활동을 시각화하고 있습니다. (약 1분 소요)
          </p>
          
          <button 
            onClick={onComplete}
            className="mt-12 text-gray-500 hover:text-white text-xs border border-gray-800 hover:border-gray-500 rounded-full px-4 py-2 transition-all"
          >
            기다리지 않고 건너뛰기
          </button>
        </div>
      </div>
    );
  }

  if (status === 'playing' && videoUrl) {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center animate-fade-in">
        <video 
          src={videoUrl} 
          autoPlay 
          controls 
          className="w-full h-full object-contain"
          onEnded={onComplete}
        />
        <button 
          onClick={onComplete}
          className="absolute top-6 right-6 bg-black/50 hover:bg-black/80 text-white px-5 py-2 rounded-full backdrop-blur-md border border-white/10 transition-all flex items-center gap-2 group"
        >
          <span>상세 화면으로 이동</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    );
  }

  return null;
};

export default CompanyIntroVideo;
