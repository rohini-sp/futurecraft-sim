import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, description, category } = await req.json();
    
    console.log('Simulating scenario:', { title, category });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User authenticated:', user.id);

    // Call Lovable AI to generate outcomes
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an AI life simulator that helps people make better decisions by showing them possible outcomes. 
Analyze the scenario and generate three different outcomes:
1. Optimistic Path (65% probability) - Best case scenario
2. Realistic Path (25% probability) - Most likely outcome
3. Cautionary Path (10% probability) - Challenges to consider

Also generate 3-5 practical mentor tips for making this decision.

Return ONLY a valid JSON object with this exact structure:
{
  "outcomes": [
    {
      "type": "optimistic",
      "title": "string",
      "description": "string (2-3 sentences)",
      "probability": "65%",
      "impact": "High Growth"
    },
    {
      "type": "realistic",
      "title": "string",
      "description": "string (2-3 sentences)",
      "probability": "25%",
      "impact": "Moderate Growth"
    },
    {
      "type": "cautionary",
      "title": "string",
      "description": "string (2-3 sentences)",
      "probability": "10%",
      "impact": "Requires Adaptation"
    }
  ],
  "mentorTips": ["tip1", "tip2", "tip3", "tip4", "tip5"]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Scenario: ${title}\nDescription: ${description}\nCategory: ${category}\n\nGenerate outcomes and mentor tips for this scenario.` 
          }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiContent = aiData.choices[0].message.content;
    
    console.log('AI response received');

    // Parse AI response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanContent = aiContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('Failed to parse AI response');
    }

    // Create scenario in database
    const { data: scenario, error: scenarioError } = await supabaseClient
      .from('scenarios')
      .insert({
        user_id: user.id,
        title,
        description,
        category,
      })
      .select()
      .single();

    if (scenarioError) {
      console.error('Error creating scenario:', scenarioError);
      throw scenarioError;
    }

    console.log('Scenario created:', scenario.id);

    // Create outcomes in database
    const outcomesData = parsedResponse.outcomes.map((outcome: any) => ({
      scenario_id: scenario.id,
      type: outcome.type,
      title: outcome.title,
      description: outcome.description,
      probability: outcome.probability,
      impact: outcome.impact,
    }));

    const { error: outcomesError } = await supabaseClient
      .from('outcomes')
      .insert(outcomesData);

    if (outcomesError) {
      console.error('Error creating outcomes:', outcomesError);
      throw outcomesError;
    }

    console.log('Outcomes created');

    // Create mentor tips in database
    const tipsData = parsedResponse.mentorTips.map((tip: string) => ({
      scenario_id: scenario.id,
      tip,
    }));

    const { error: tipsError } = await supabaseClient
      .from('mentor_tips')
      .insert(tipsData);

    if (tipsError) {
      console.error('Error creating mentor tips:', tipsError);
      throw tipsError;
    }

    console.log('Mentor tips created');

    // Update user profile: increment total scenarios and wisdom points
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .update({
        total_scenarios: supabaseClient.rpc('increment', { x: 1 }),
        wisdom_points: supabaseClient.rpc('increment', { x: 10 }),
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
    }

    return new Response(
      JSON.stringify({
        scenario,
        outcomes: parsedResponse.outcomes,
        mentorTips: parsedResponse.mentorTips,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in simulate-scenario function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});