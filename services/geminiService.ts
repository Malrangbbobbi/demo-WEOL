
import { GoogleGenAI, Type } from "@google/genai";
import type { ModelOutput, RiskPreference, SdgScore, RawCompanyData, CompanyRecommendation } from '../types';
import { SDG_LIST } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "mock-key" });

// ----------------------------------------------------------------------
// MOCK DATA (Simulating your CSV file)
// In a real Vercel deployment, you would fetch('/data.csv') and parse it.
// ----------------------------------------------------------------------
const MOCK_DB: RawCompanyData[] = [
    {
        company_name: "한국가스공사",
        corp_code: "036460",
        Risk_Tag: "중립형",
        // Sample data from your provided CSV snippet
        G01_mentions_per_1k_tokens: 1.016, G01_sent_mean: 0.785, G01_reference_sentence: "[TABLE p15 #13] • 글로벌 기후변화 대응 지원 • 고객사 에너지 복지 및 이익 공유",
        G07_mentions_per_1k_tokens: 3.460, G07_sent_mean: 0.886, G07_reference_sentence: "KOGAS는 LNG 추진선을 보유한 국내·외 선박회사들을 대상으로 LNG 연료를 공급하는 LNG 벙커링 사업을 통해 온실가스 감축에 기여하고 있습니다.",
        G13_mentions_per_1k_tokens: 2.663, G13_sent_mean: 0.751, G13_reference_sentence: "KOGAS는 기후변화 대응과 탄소중립을 위한 국가의 노력에 동참하고자 2008년부터 자발적으로 중장기 온실가스 저감 목표를 설정하였습니다.",
        // Fillers for other SDGs to prevent errors
        G02_mentions_per_1k_tokens: 0.05, G02_sent_mean: 0.18, G02_reference_sentence: "지역 사회 급식 지원 프로그램 운영",
        G03_mentions_per_1k_tokens: 1.89, G03_sent_mean: 0.73, G03_reference_sentence: "임직원 건강 증진을 위한 사내 헬스케어 센터 운영",
    },
    {
        company_name: "삼성전자",
        corp_code: "005930",
        Risk_Tag: "공격형",
        G07_mentions_per_1k_tokens: 2.1, G07_sent_mean: 0.9, G07_reference_sentence: "재생에너지 100% 전환을 위한 글로벌 캠페인 RE100 가입 및 반도체 사업장 태양광 발전 설비 확충.",
        G09_mentions_per_1k_tokens: 4.5, G09_sent_mean: 0.95, G09_reference_sentence: "차세대 AI 반도체 기술 개발을 통한 산업 혁신 주도 및 스마트 팩토리 고도화.",
        G12_mentions_per_1k_tokens: 3.2, G12_sent_mean: 0.85, G12_reference_sentence: "폐어망을 재활용한 소재를 갤럭시 시리즈에 적용하여 해양 오염 방지 및 자원 순환에 기여.",
        G01_mentions_per_1k_tokens: 0.5, G01_sent_mean: 0.6, G01_reference_sentence: "사회 공헌 기금을 통한 저소득층 교육 지원",
    },
    {
        company_name: "LG화학",
        corp_code: "051910",
        Risk_Tag: "중립형",
        G13_mentions_per_1k_tokens: 3.8, G13_sent_mean: 0.82, G13_reference_sentence: "2050 넷제로 달성을 위한 탄소 감축 로드맵 수립 및 바이오 원료 기반 플라스틱 생산 확대.",
        G07_mentions_per_1k_tokens: 2.9, G07_sent_mean: 0.88, G07_reference_sentence: "전기차 배터리 소재 혁신을 통한 친환경 에너지 생태계 구축 가속화.",
        G06_mentions_per_1k_tokens: 1.5, G06_sent_mean: 0.75, G06_reference_sentence: "폐수 재이용 시스템 도입을 통한 공업용수 사용 절감 및 수질 오염 방지.",
        G01_mentions_per_1k_tokens: 0.2, G01_sent_mean: 0.5, G01_reference_sentence: "지역 사회 상생 협력 기금 조성",
    },
     {
        company_name: "네이버",
        corp_code: "035420",
        Risk_Tag: "안전형",
        G09_mentions_per_1k_tokens: 3.5, G09_sent_mean: 0.92, G09_reference_sentence: "하이퍼스케일 AI '하이퍼클로바X'를 활용한 중소상공인 디지털 전환 지원.",
        G05_mentions_per_1k_tokens: 2.8, G05_sent_mean: 0.89, G05_reference_sentence: "여성 리더십 확대 및 다양성 위원회 운영을 통한 포용적 조직 문화 조성.",
        G04_mentions_per_1k_tokens: 1.9, G04_sent_mean: 0.85, G04_reference_sentence: "소프트웨어 교육 재단을 통한 미래 인재 양성 및 교육 격차 해소.",
        G01_mentions_per_1k_tokens: 0.8, G01_sent_mean: 0.7, G01_reference_sentence: "소상공인 성장 지원 프로그램 프로젝트 꽃 운영",
    }
];

// Helper to format SDG ID to G-code (e.g., 1 -> "G01", 17 -> "G17")
const getGCode = (id: number) => `G${id.toString().padStart(2, '0')}`;

/**
 * Calculates a match score for a company based on user's selected SDGs.
 * Score = Sum( (Mentions * Sentiment) of User's SDGs )
 */
const calculateScore = (company: RawCompanyData, userSdgScores: SdgScore[]): number => {
    let totalScore = 0;
    
    userSdgScores.forEach(s => {
        const gCode = getGCode(s.sdgId);
        const mentions = company[`${gCode}_mentions_per_1k_tokens`] || 0;
        const sentiment = company[`${gCode}_sent_mean`] || 0;
        const userWeight = s.score; // 1 to 5

        // Simple scoring formula: Mention Frequency * Sentiment * User Weight
        totalScore += (mentions * sentiment * userWeight);
    });

    return totalScore;
};

/**
 * 1. Filter/Rank Mock Data based on inputs.
 * 2. Use Gemini to generate text content (Explanation, Report, SNS) for the top companies.
 */
export const getCompanyRecommendations = async (
    sdgScores: SdgScore[],
    riskPreference: RiskPreference
): Promise<ModelOutput> => {
    // 1. Score and Rank Companies from Data
    const scoredCompanies = MOCK_DB.map(company => {
        const score = calculateScore(company, sdgScores);
        // Find the top matched SDG for this company among user's selection
        const topSdg = sdgScores.reduce((prev, current) => {
             const prevCode = getGCode(prev.sdgId);
             const currCode = getGCode(current.sdgId);
             const prevVal = (company[`${prevCode}_mentions_per_1k_tokens`] || 0) * (company[`${prevCode}_sent_mean`] || 0);
             const currVal = (company[`${currCode}_mentions_per_1k_tokens`] || 0) * (company[`${currCode}_sent_mean`] || 0);
             return (currVal > prevVal) ? current : prev;
        }, sdgScores[0]);

        return { ...company, score, topSdgId: topSdg.sdgId };
    }).sort((a, b) => b.score - a.score);

    // Get Top 3
    const top3 = scoredCompanies.slice(0, 3);

    // 2. Generate Content for Top 3 using Gemini
    const recommendations: CompanyRecommendation[] = [];

    for (const company of top3) {
        const topGCode = getGCode(company.topSdgId);
        const referenceSentence = company[`${topGCode}_reference_sentence`] || "Innovative sustainable technology implementation.";
        
        // Construct a prompt for Gemini to generate the text fields based on raw data
        const prompt = `
        Based on the following company data, generate a structured Korean response.
        
        **Company**: ${company.company_name}
        **Key SDG Activity**: ${referenceSentence}
        **Sentiment Score**: ${company[`${topGCode}_sent_mean`]}
        **User Risk Profile**: ${riskPreference}

        Please generate:
        1. **explanation**: A 2-sentence summary of why this company matches the user's SDG interest.
        2. **investment_report**: A professional investment analyst paragraph (3-4 sentences) explaining the company's value proposition and future outlook based on the activity. Use a formal tone ("~할 것으로 전망됩니다").
        3. **sns_promotion**: A catchy Instagram-style caption with emojis and hashtags promoting this company's good impact.

        Response format: JSON
        `;

        let generatedContent: any = {};
        
        if (API_KEY) {
             try {
                const result = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                explanation: { type: Type.STRING },
                                investment_report: { type: Type.STRING },
                                sns_promotion: { type: Type.STRING }
                            }
                        }
                    }
                });
                generatedContent = JSON.parse(result.text || "{}");
            } catch (e) {
                console.error("Gemini Text Gen Error", e);
                generatedContent = {
                    explanation: `${company.company_name}은(는) 귀하가 선택한 SDG 분야에서 탁월한 성과를 보이고 있습니다.`,
                    investment_report: "데이터 분석 결과, 해당 기업은 지속 가능한 성장 가능성이 매우 높습니다.",
                    sns_promotion: `지구를 지키는 ${company.company_name}! 함께 응원해요 ✨`
                };
            }
        }

        recommendations.push({
            corp_name: company.company_name,
            corp_code: company.corp_code,
            match_score: company.score * 10, // Scale up for display
            top_sdg: topGCode,
            explanation: generatedContent.explanation || "분석 정보를 불러오는 중...",
            investment_report: generatedContent.investment_report || "투자 보고서를 생성하는 중...",
            sns_promotion: generatedContent.sns_promotion || "홍보 문구를 생성하는 중...",
            image_reference_sentence: referenceSentence, // Pass the raw reference sentence for image gen
            sdg_alignment: Array(17).fill(0).map((_, i) => (company[`${getGCode(i+1)}_sent_mean`] || 0) * 5) // Mock alignment chart
        });
    }

    return { recommended_companies: recommendations };
};

export const generateCompanyImage = async (referenceSentence: string): Promise<string | null> => {
    if (!API_KEY) return null;

    try {
        // Translate/Refine prompt for better image results if the sentence is Korean
        // For simplicity, we pass it directly or wrap it.
        const imagePrompt = `Hyper-realistic, high quality, cinematic shot representing this concept: "${referenceSentence}". 
        Futuristic, sustainable, inspiring atmosphere. No text, 8k resolution.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image', // NANO BANANA
            contents: { parts: [{ text: imagePrompt }] },
        });

        for (const candidate of response.candidates || []) {
            for (const part of candidate.content?.parts || []) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};
