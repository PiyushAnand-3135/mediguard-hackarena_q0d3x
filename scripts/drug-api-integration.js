// This script demonstrates how to integrate with a drug information API

// Simulated API client for OpenFDA or DrugBank
class DrugInfoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseUrl = "https://api.example.com/drug-info" // Placeholder URL
  }

  async getMedicationInfo(medicationName) {
    console.log(`Fetching information for: ${medicationName}`)

    // In a real implementation, this would make an actual API call
    // For demo purposes, we'll return simulated data

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulated database of medications
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
        ],
        interactions: [
          {
            substance: "Alcohol",
            severity: "high",
            description: "Combining with alcohol may cause liver damage.",
          },
          {
            substance: "Warfarin",
            severity: "medium",
            description: "May increase the risk of bleeding when taken with blood thinners.",
          },
        ],
        sideEffects: [
          { name: "Nausea", frequency: "common" },
          { name: "Stomach pain", frequency: "common" },
          { name: "Headache", frequency: "uncommon" },
          { name: "Skin rash", frequency: "uncommon" },
          { name: "Liver damage (with overdose)", frequency: "rare" },
        ],
      },
      ibuprofen: {
        name: "Ibuprofen 200mg",
        description: "Non-steroidal anti-inflammatory drug (NSAID)",
        activeIngredients: [{ name: "Ibuprofen", amount: "200mg" }],
        inactiveIngredients: ["Microcrystalline Cellulose", "Corn Starch", "Croscarmellose Sodium"],
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
        ],
        interactions: [
          {
            substance: "Aspirin",
            severity: "medium",
            description: "May increase risk of gastrointestinal bleeding.",
          },
          {
            substance: "Blood Pressure Medications",
            severity: "medium",
            description: "May reduce the effectiveness of certain blood pressure medications.",
          },
        ],
        sideEffects: [
          { name: "Stomach pain", frequency: "common" },
          { name: "Heartburn", frequency: "common" },
          { name: "Dizziness", frequency: "uncommon" },
          { name: "Stomach bleeding", frequency: "rare" },
        ],
      },
    }

    // Normalize the medication name for lookup
    const normalizedName = medicationName.toLowerCase().trim()

    // Find the medication in our simulated database
    for (const [key, data] of Object.entries(medicationDatabase)) {
      if (normalizedName.includes(key)) {
        console.log(`Found medication information for: ${data.name}`)
        return {
          success: true,
          data,
        }
      }
    }

    // If medication not found
    console.log(`No information found for: ${medicationName}`)
    return {
      success: false,
      error: "Medication not found in database",
    }
  }

  async checkInteractions(medications) {
    console.log(`Checking interactions between: ${medications.join(", ")}`)

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real implementation, this would check a comprehensive database
    // For demo purposes, we'll return simulated interaction data

    if (medications.includes("paracetamol") && medications.includes("ibuprofen")) {
      return {
        hasInteractions: true,
        interactions: [
          {
            medications: ["Paracetamol", "Ibuprofen"],
            severity: "low",
            description:
              "Generally safe to take together at recommended doses, but may increase risk of kidney problems with long-term use.",
          },
        ],
      }
    }

    return {
      hasInteractions: false,
      interactions: [],
    }
  }
}

// Create an instance of the API client
const drugAPI = new DrugInfoAPI("demo-api-key")

// Demonstrate fetching medication information
const paracetamolInfo = await drugAPI.getMedicationInfo("Paracetamol 500mg")
console.log("Medication Information:", JSON.stringify(paracetamolInfo, null, 2))

// Demonstrate checking drug interactions
const interactionCheck = await drugAPI.checkInteractions(["paracetamol", "ibuprofen"])
console.log("Interaction Check:", JSON.stringify(interactionCheck, null, 2))
