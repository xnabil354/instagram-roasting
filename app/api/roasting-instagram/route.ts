import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Groq } from 'groq-sdk';
import { InstagramData } from '@/lib/types';

const genAI = new GoogleGenerativeAI("AIzaSyCljxrKrLrVeRoxHeYxFZrJMTSFOt5_Kf0");
const groq = new Groq({ apiKey: "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" });

async function generateContent(model: string, prompt: string) {
    if (model === "groqai") {
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama3-70b-8192',
        });
        return chatCompletion.choices[0].message.content;
      } else {
        const safetySettings = [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        ];
    
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      }
}

export async function POST(request: NextRequest) {
  try {
    const { query, model } = await request.json();

    let igData = await axios.get(`https://api.sanzy.co/api/igstalk?username=${query}`);
    let userData = igData.data.data;

    if (!userData.user_info) {
      return NextResponse.json({ error: 'Instagram username not found' }, { status: 404 });
    }

    let DataIg: InstagramData = {
        id: userData.user_info.id,
        username: userData.user_info.username,
        full_name: userData.user_info.full_name,
        biography: userData.user_info.biography,
        external_url: userData.user_info.external_url,
        is_private: userData.user_info.is_private,
        is_verified: userData.user_info.is_verified,
        profile_pic_url: userData.user_info.profile_pic_url,
        posts: userData.user_info.posts,
        followers: userData.user_info.followers,
        following: userData.user_info.following
    };

    var prompt = `berikan roasting dengan kejam,menyindir, serta menyakitkan dalam bahasa gaul untuk profile instagram berikut : ${query}. Berikut detailnya: "${JSON.stringify(DataIg)}"`;

    const result = await generateContent(model ?? "geminiai", prompt);

    return NextResponse.json({ roasting: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}