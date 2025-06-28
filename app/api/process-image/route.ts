import { type NextRequest, NextResponse } from "next/server"

// This is a simulated database of medications
const medicationDatabase = {
  paracetamol: {
    name: "Paracetamol 500mg",
    description: "Pain reliever and fever reducer",
    activeIngredients: [{ name: "Paracetamol (Acetaminophen)", amount: "500mg" }],
    inactiveIngredients: ["Starch", "Povidone", "Stearic Acid", "Magnesium Stearate"],
    alternatives: [
      {
        name: "Generic Acetaminophen",
        type: "generic",
        price: "$4.99",
        availability: "high",
        similarityScore: 100,
      },
      {
        name: "Tylenol Extra Strength",
        type: "branded",
        price: "$8.99",
        availability: "high",
        similarityScore: 95,
      },
      {
        name: "Panadol",
        type: "branded",
        price: "$7.49",
        availability: "medium",
        similarityScore: 90,
      },
    ],
    interactions: [
      {
        substance: "Alcohol",
        severity: "high",
        description: "Combining with alcohol may cause liver damage. Avoid alcohol while taking this medication.",
      },
      {
        substance: "Warfarin",
        severity: "medium",
        description: "May increase the risk of bleeding when taken with blood thinners like warfarin.",
      },
    ],
    sideEffects: [
      { name: "Nausea", frequency: "common" },
      { name: "Stomach pain", frequency: "common" },
      { name: "Headache", frequency: "uncommon" },
      { name: "Skin rash", frequency: "uncommon" },
      { name: "Liver damage (with overdose)", frequency: "rare" },
      { name: "Allergic reaction", frequency: "rare" },
    ],
  },
  ibuprofen: {
    name: "Ibuprofen 200mg",
    description: "Non-steroidal anti-inflammatory drug (NSAID)",
    activeIngredients: [{ name: "Ibuprofen", amount: "200mg" }],
    inactiveIngredients: ["Microcrystalline Cellulose", "Corn Starch", "Croscarmellose Sodium", "Silicon Dioxide"],
    alternatives: [
      {
        name: "Generic Ibuprofen",
        type: "generic",
        price: "$5.49",
        availability: "high",
        similarityScore: 100,
      },
      {
        name: "Advil",
        type: "branded",
        price: "$9.99",
        availability: "high",
        similarityScore: 95,
      },
      {
        name: "Motrin",
        type: "branded",
        price: "$8.99",
        availability: "medium",
        similarityScore: 90,
      },
    ],
    interactions: [
      {
        substance: "Aspirin",
        severity: "medium",
        description: "May increase risk of gastrointestinal bleeding when taken with aspirin.",
      },
      {
        substance: "Blood Pressure Medications",
        severity: "medium",
        description: "May reduce the effectiveness of certain blood pressure medications.",
      },
      {
        substance: "Anticoagulants",
        severity: "high",
        description: "Increases risk of serious bleeding when taken with blood thinners.",
      },
    ],
    sideEffects: [
      { name: "Stomach pain", frequency: "common" },
      { name: "Heartburn", frequency: "common" },
      { name: "Nausea", frequency: "common" },
      { name: "Dizziness", frequency: "uncommon" },
      { name: "Rash", frequency: "uncommon" },
      { name: "Stomach bleeding", frequency: "rare" },
      { name: "Liver problems", frequency: "rare" },
    ],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    // In a real application, we would use Tesseract.js to extract text from the image
    // For demo purposes, we'll simulate OCR by returning a predefined medication

    // Simulate OCR processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Randomly select a medication from our database for demo purposes
    const medications = Object.values(medicationDatabase)
    const randomMedication = medications[Math.floor(Math.random() * medications.length)]

    return NextResponse.json(randomMedication)

    /* 
    // This is how we would implement actual OCR with Tesseract.js
    const worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    // Remove the data URL prefix to get the base64 string
    const base64Image = image.split(',')[1];
    const { data } = await worker.recognize(Buffer.from(base64Image, 'base64'));
    await worker.terminate();
    
    const extractedText = data.text.toLowerCase();
    
    // Search for known medications in the extracted text
    let foundMedication = null;
    for (const [key, medication] of Object.entries(medicationDatabase)) {
      if (extractedText.includes(key)) {
        foundMedication = medication;
        break;
      }
    }
    
    if (foundMedication) {
      return NextResponse.json(foundMedication);
    } else {
      // If no known medication is found, return a generic response
      return NextResponse.json(
        { error: "Could not identify medication from image" },
        { status: 404 }
      );
    }
    */
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
