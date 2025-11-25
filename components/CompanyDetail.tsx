
import React, { useEffect, useState } from 'react';
import type { CompanyRecommendation, SDG } from '../types';
import { generateCompanyImage } from '../services/geminiService';

interface CompanyDetailProps {
    company: CompanyRecommendation;
    userSdgs: SDG[];
    onBack: () => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

    useEffect(() => {
        const fetchImage = async () => {
            if (!company.image_reference_sentence) return;
            
            setIsLoadingImage(true);
            const url = await generateCompanyImage(company.image_reference_sentence);
            setImageUrl(url);
            setIsLoadingImage(false);
        };
        fetchImage();
    }, [company]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 animate-fade-in flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* 1. Header: Company Name and Ticker */}
                <header className="p-8 border-b border-gray-100 flex justify-between items-start bg-white">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{company.corp_name}</h1>
                        <p className="text-lg text-blue-600 font-semibold mt-1">{company.corp_code}</p>
                    </div>
                    <button 
                        onClick={onBack} 
                        className="text-gray-400 hover:text-gray-900 transition-colors p-2"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                <div className="p-8 space-y-10">
                    {/* 2. AI Analysis Summary */}
                    <section>
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">AI 분석 요약</h2>
                        <div className="text-gray-800 text-lg leading-relaxed font-medium">
                            {company.explanation}
                        </div>
                    </section>

                    {/* 3. AI Image Generation */}
                    <section>
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">AI 이미지 생성 (Nano Banana)</h2>
                        <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden relative shadow-lg">
                            {isLoadingImage ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                                    <p className="text-sm text-gray-500 font-medium">활동 내역 기반 생성 중...</p>
                                </div>
                            ) : imageUrl ? (
                                <img 
                                    src={imageUrl} 
                                    alt="AI Generated Visualization" 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                                    <p>이미지를 생성할 수 없습니다.</p>
                                </div>
                            )}
                        </div>
                        <p className="mt-3 text-xs text-gray-400 italic border-l-2 border-gray-200 pl-3">
                             Ref: {company.image_reference_sentence.substring(0, 100)}{company.image_reference_sentence.length > 100 ? '...' : ''}
                        </p>
                    </section>

                    {/* 4. Natural Language Explanation (Investment Report) */}
                    <section>
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">자연어 설명 생성</h2>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                                {company.investment_report}
                            </p>
                        </div>
                    </section>

                    {/* 5. SNS Promotion Text */}
                    <section>
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">SNS 홍보 문구</h2>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
                            <p className="text-indigo-900 text-lg font-medium whitespace-pre-wrap font-sans">
                                {company.sns_promotion}
                            </p>
                        </div>
                    </section>
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <button 
                        onClick={onBack}
                        className="text-gray-500 hover:text-gray-900 font-semibold text-sm transition-colors"
                    >
                        ← 목록으로 돌아가기
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }
            `}</style>
        </div>
    );
};

export default CompanyDetail;
