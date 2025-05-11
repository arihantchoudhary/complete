import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { model, messages } = await request.json();
    
    // Determine which API to call based on model
    let apiUrl;
    let apiKey;
    let requestBody;
    let headers = {
      'Content-Type': 'application/json',
    };
    
    // Format request based on model type
    if (model.includes('gpt')) {
      // OpenAI API
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      apiKey = process.env.OPENAI_API_KEY;
      
      if (!apiKey) {
        return NextResponse.json({ error: 'OpenAI API key not found' }, { status: 500 });
      }
      
      headers['Authorization'] = `Bearer ${apiKey}`;
      
      requestBody = {
        model: model,
        messages: messages.filter(msg => msg.role !== 'error'),
        temperature: 0.7,
      };
    } else if (model.includes('claude')) {
      // Anthropic API
      apiUrl = 'https://api.anthropic.com/v1/messages';
      apiKey = process.env.ANTHROPIC_API_KEY;
      
      if (!apiKey) {
        return NextResponse.json({ error: 'Anthropic API key not found' }, { status: 500 });
      }
      
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      
      // Convert messages to Anthropic format
      const formattedMessages = messages
        .filter(msg => msg.role !== 'error')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }));
      
      requestBody = {
        model: model,
        messages: formattedMessages,
        max_tokens: 1000,
      };
    } else {
      return NextResponse.json({ error: 'Unsupported model' }, { status: 400 });
    }
    
    // Make the actual API call
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`API Error (${response.status}):`, errorData);
        return NextResponse.json(
          { error: `API Error: ${response.status} ${response.statusText}` }, 
          { status: response.status }
        );
      }
      
      const data = await response.json();
      
      let message;
      // Extract the response content based on which API was used
      if (model.includes('gpt')) {
        // OpenAI response format
        message = data.choices[0].message.content;
      } else if (model.includes('claude')) {
        // Anthropic response format
        message = data.content[0].text;
      }
      
      return NextResponse.json({ message });
    } catch (fetchError) {
      console.error('API fetch error:', fetchError);
      return NextResponse.json(
        { error: `Failed to communicate with AI provider: ${fetchError.message}` }, 
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 