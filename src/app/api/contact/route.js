import { NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const { inquiryType, companyName, departmentName, fullName, email, inquiryContent } = body;

    // 入力検証
    if (!inquiryType || !companyName || !fullName || !email || !inquiryContent) {
      return NextResponse.json({ message: '必要な情報が不足しています。' }, { status: 400 });
    }

    // Discordに送信するメッセージを作成
    const message = {
      content: 'New contact form submission',
      embeds: [{
        title: 'お問い合わせ内容',
        fields: [
          { name: 'お問い合わせ種類', value: inquiryType },
          { name: '会社名', value: companyName },
          { name: '部署名', value: departmentName || 'N/A' },
          { name: 'お名前', value: fullName },
          { name: 'メールアドレス', value: email },
          { name: 'お問い合わせ内容', value: inquiryContent }
        ],
        color: 5814783, // 青色
      }]
    };

    // Discordへ送信
    if (!DISCORD_WEBHOOK_URL) {
      console.error('Discord Webhook URL is not set');
      return NextResponse.json({ message: 'サーバー設定エラーが発生しました。' }, { status: 500 });
    }

    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!discordResponse.ok) {
      throw new Error(`Discord API responded with ${discordResponse.status}`);
    }

    console.log('Contact form submission sent to Discord successfully');
    return NextResponse.json({ message: 'お問い合わせを受け付けました。ありがとうございます。' });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json({ message: 'お問い合わせの処理中にエラーが発生しました。後ほど再度お試しください。' }, { status: 500 });
  }
}