import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { tokens } = await request.json()

    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      return NextResponse.json({ error: "No valid tokens provided" }, { status: 400 })
    }

    const formattedText = tokens.map(t => `"${t}"`).join(", ")

    const prompt = `
The following tokens were extracted from a medicine label using OCR. These may include partial words, noise, or misspellings:

[${formattedText}]

Please:
1. Clean up and identify the actual medicine name.
2. Determine the purpose and description of the medicine.
3. Extract as much structured information as possible in this JSON format:

{
  "name": string,
  "description": string,
  "activeIngredients": [
    { "name": string, "amount": string }
  ],
  "inactiveIngredients": [string],
  "alternatives": [
    {
      "name": string,
      "type": "generic" | "branded",
      "price": string,
      "availability": "high" | "medium" | "low",
      "similarityScore": number
    }
  ],
  "interactions": [
    {
      "substance": string,
      "severity": "high" | "medium" | "low",
      "description": string
    }
  ],
  "sideEffects": [
    {
      "name": string,
      "frequency": "common" | "uncommon" | "rare"
    }
  ]
}

💡 If you're not sure about some sections (like side effects, drug interactions, or alternatives), make intelligent assumptions based on typical usage of the active ingredients (e.g. sore throat lozenges with alcohol and antiseptics).

Do NOT include markdown or any explanation — return only raw JSON.
`



    const mistralResponse = await fetch("http://localhost:8081/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (!mistralResponse.ok) {
      throw new Error("Failed to get response from Mistral API")
    }

    const data = await mistralResponse.json()
    console.log("Raw Mistral response string:", data.response)

    let raw = data.response.trim()
    // Remove markdown code block wrappers like ```json ... ```
    raw = raw.replace(/^```json\s*/, '').replace(/```$/, '')

    let parsedResponse
    try {
      parsedResponse = JSON.parse(raw)
    } catch (err) {
      console.error("JSON parse error:", err)
      parsedResponse = { rawResponse: data.response }
    }

    console.log("📥 Parsed Mistral response:", parsedResponse)

    return NextResponse.json(parsedResponse)
  } catch (err) {
    console.error("❌ Error in /api/process-text:", err)
    return NextResponse.json({ error: "Failed to process text" }, { status: 500 })
  }
}
