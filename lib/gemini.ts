import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "./supabase";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is missing from environment variables!");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getAIResponse(userMessage: string) {
  try {
    console.log("Fetching products for AI context...");
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('name, description, price');

    if (productError) {
      console.error('Supabase error fetching products:', productError);
    }

    const productContext = products && products.length > 0
      ? products.map(p => `- ${p.name} (${p.price} VNĐ): ${p.description}`).join('\n')
      : "Không có thông tin sản phẩm cụ thể hiện tại.";

    console.log("Calling Gemini API (gemini-2.5-flash)...");

    // Explicitly using the most stable model name with the v1 API.
    // Note: Use "gemini-1.5-flash" for general availability. 
    // If you have a specific quota for another version, you can change the string below.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Bạn là trợ lý bán hàng linh hoạt. Dựa trên danh sách sản phẩm sau:
${productContext}

Câu hỏi khách hàng: [${userMessage}]

Hãy trả lời thân thiện, chuyên nghiệp và ngắn gọn. Nếu không có sản phẩm phù hợp, hãy tư vấn khách hàng liên hệ hotline.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("AI Response generated successfully");
    return text;
  } catch (err: any) {
    console.error("Detailed Gemini AI Error:", err);

    // Provide actionable feedback in the chat UI
    if (err.message?.includes("404") || err.message?.includes("not found")) {
      return `Lỗi AI (404): Không tìm thấy mô hình 'gemini-1.5-flash'. 
Hệ thống hiện đã cập nhật lên SDK mới nhất. Vui lòng đảm bảo API Key của bạn là chính xác và có quyền truy cập vào model này tại Google AI Studio.`;
    }

    return `Xin lỗi, tôi gặp sự cố khi kết nối với AI: ${err.message || 'Lỗi không xác định'}. Vui lòng kiểm tra Console (F12) để biết chi tiết.`;
  }
}
